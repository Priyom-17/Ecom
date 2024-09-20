import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host : "smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOrderConfirmationEmail = (order, customerEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Order Confirmation",
        text: `
Dear Customer,
Your order has been received. Thank you for your purchase!

Order ID: ${order.id || 'N/A'}
Order Date: ${new Date(order.date || Date.now()).toLocaleString()}
Total Price: ৳${(order.total || 0).toFixed(2)}
Items:
${order.items
            .map(
                (item) =>
                    `- ${item.name || 'Unknown Item'} (Quantity: ${item.quantity}, Price: ৳${item.price})`
            )
            .join("\n")}

Best regards,
TechMania.
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending confirmation email:", error);
        } else {
            console.log("Confirmation email sent:", info.response);
        }
    });
};

export const sendOrderNotificationEmail = (order) => {
    // Access _doc to get the actual order details
    const orderDetails = order._doc || order;

    // Log the order object to debug
    console.log('Order details for notification email:', orderDetails);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Order Notification",
        text: `
A new order has been placed.

Order ID: ${orderDetails._id || 'N/A'}
Order Date: ${new Date(orderDetails.createdAt || Date.now()).toLocaleString()}
Customer Name: ${order.customerName || 'N/A'}
Customer Email: ${order.customerEmail || 'N/A'}
Customer Phone: ${order.customerPhone || 'N/A'}
Total Price: ৳${(orderDetails.total || 0).toFixed(2)}
Items:
${orderDetails.items
            .map(
                (item) =>
                    `- ${item.name || 'Unknown Item'} (Quantity: ${item.quantity}, Price: ৳${item.price})`
            )
            .join("\n")}
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending notification email:", error);
        } else {
            console.log("Notification email sent:", info.response);
        }
    });
};