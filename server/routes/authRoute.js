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

router.get('/product-stats', async (req, res) => {
    try {
        // Aggregate orders to calculate total quantities for each product
        const productStats = await Order.aggregate([
            { $unwind: "$items" }, // Flatten the array of items
            {
                $group: {
                    _id: "$items.productId", // Group by productId
                    totalQuantity: { $sum: "$items.quantity" } // Sum the quantities
                }
            },
            {
                $lookup: {
                    from: "products", // Assuming your product collection is named "products"
                    localField: "_id", // Use the productId from the group
                    foreignField: "_id", // Match it with the product's _id
                    as: "productInfo" // Store product info
                }
            },
            { $unwind: "$productInfo" }, // Flatten product info
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    productName: "$productInfo.name" // Project product name and total quantity
                }
            }
        ]);

        res.status(200).json(productStats);
    } catch (error) {
        console.error("Error fetching product stats:", error);
        res.status(500).json({ success: false, message: "Error fetching product stats" });
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

        // Fetch the newly created order with populated product details
        const populatedOrder = await Order.findById(newOrder._id)
            .populate({
                path: 'items.productId',
                select: 'name image' // Ensure to select fields you need
            });

        // Send confirmation email
        await sendOrderConfirmationEmail(populatedOrder, customerEmail);
        await sendOrderNotificationEmail({
            ...populatedOrder._doc, // Spread the populated order details
            customerName,
            customerEmail,
            customerPhone,
        });

        res.status(200).json({ message: "Order confirmed and emails sent!", order: populatedOrder });
    } catch (error) {
        console.error('Error confirming order:', error); // Log the error details
        res.status(500).json({ success: false, message: "Error confirming order." });
    }
});
export default router;
