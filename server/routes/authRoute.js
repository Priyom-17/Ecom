import express from "express";
import {
    loginController,
    registerController,
    testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    sendOrderConfirmationEmail,
    sendOrderNotificationEmail,
} from "../config/sendmail.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

router.post("/confirm-order", (req, res) => {
    const { order, customerEmail, customerName, customerPhone } = req.body;

    sendOrderConfirmationEmail(order, customerEmail);

    sendOrderNotificationEmail({
        ...order,
        customerName,
        customerEmail,
        customerPhone,
    });

    res.status(200).json({ message: "Order confirmed and emails sent!" });
});

export default router;
