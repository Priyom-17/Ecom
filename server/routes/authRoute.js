import express from "express";
import {
    loginController,
    registerController,
    testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import sendEmail from "../config/sendmail.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);
router.post("/confirm-order", async (req, res) => {
    const {
        orderId,
        date,
        items,
        totalPrice,
        customerName,
        customerEmail,
        customerNumber,
    } = req.body;

    // Prepare the email content
    const subject = `Order Confirmation - Order ID: ${orderId}`;
    const text = `
    Name: ${customerName},
    Order ID: ${orderId}
    Date: ${date}
    Total Price: ৳${totalPrice.toFixed(2)}
    Items:
    ${items
            .map(
                (item) =>
                    `- ${item.name} (Quantity: ${item.quantity}, Price: ৳${item.price})`
            )
            .join("\n")}
    Mail: ${process.env.EMAIL_USER}.
    `;

    try {
        // Send the email
        await sendEmail(customerEmail, subject, text);
        res.status(200).json({
            success: true,
            message: "Order confirmed and email sent!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
});

export default router;
