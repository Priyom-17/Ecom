import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
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

    Order ID: ${order.id}
    Order Date: ${new Date(order.date).toLocaleString()}
    Total Price: ৳${order.total.toFixed(2)}
    Items:
    ${order.items
                .map(
                    (item) =>
                        `- ${item.name} (Quantity: ${item.quantity}, Price: ৳${item.price})`
                )
                .join("\n")}

    Best regards,
    TechMania.
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

export const sendOrderNotificationEmail = (order) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Order Notification",
        text: `
    A new order has been placed.

    Order ID: ${order.id}
    Order Date: ${new Date(order.date).toLocaleString()}
    Customer Name: ${order.customerName}
    Customer Email: ${order.customerEmail}
    Customer Phone: ${order.customerPhone}
    Total Price: ৳${order.total.toFixed(2)}
    Items:
    ${order.items
                .map(
                    (item) =>
                        `- ${item.name} (Quantity: ${item.quantity}, Price: ৳${item.price})`
                )
                .join("\n")}
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};
