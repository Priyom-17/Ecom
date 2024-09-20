import express from "express";
import {
    loginController,
    registerController,
    testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import Order from '../models/orderModel.js'
import {
    sendOrderConfirmationEmail,
    sendOrderNotificationEmail,
} from "../config/sendmail.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get('/orders', requireSignIn, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate({
                path: 'items.productId',
                select: 'name image' // Specify the fields to retrieve
            });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error fetching orders." });
    }
});

router.post("/confirm-order", requireSignIn, async (req, res) => {
    const { order, customerEmail, customerName, customerPhone } = req.body;

    console.log('Incoming request body:', req.body); // Log the incoming request

    try {
        // Create a new order
        const newOrder = await new Order({
            userId: req.user._id, // Link order to the logged-in user
            items: order.items,
            total: order.total,
        }).save();

        // Send confirmation email
        sendOrderConfirmationEmail(newOrder, customerEmail);
        sendOrderNotificationEmail({
            ...newOrder,
            customerName,
            customerEmail,
            customerPhone,
        });

        res.status(200).json({ message: "Order confirmed and emails sent!", order: newOrder });
    } catch (error) {
        console.error('Error confirming order:', error); // Log the error details
        res.status(500).json({ success: false, message: "Error confirming order." });
    }
});
export default router;
