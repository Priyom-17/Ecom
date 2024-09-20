import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS, // Use environment variable for password
    },
    secure: true,
});

// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (order, customerEmail) => {
    const mailOptions = {
        from: {
            name: "TechMania",
            address: process.env.EMAIL_USER,
        },
        replyTo: customerEmail,
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
                    `- ${item.productId?.name || 'Unknown Item'} (Quantity: ${item.quantity}, Price: ৳${item.price})`
            )
            .join("\n")}

Best regards,
TechMania.
`,
        html: `
<p>Dear Customer,</p>
<p>Your order has been received. Thank you for your purchase!</p>
<p>Order ID: ${order.id || 'N/A'}</p>
<p>Order Date: ${new Date(order.date || Date.now()).toLocaleString()}</p>
<p>Total Price: ৳${(order.total || 0).toFixed(2)}</p>
<p>Items:</p>
<ul>
${order.items
            .map(
                (item) =>
                    `<li>${item.productId?.name || 'Unknown Item'} (Quantity: ${item.quantity}, Price: ৳${item.price})</li>`
            )
            .join("")}
</ul>
<p>Best regards,<br>TechMania.</p>
`,
    };

    // Verify the transporter
    await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                console.error("Error verifying transporter:", error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    // Send the email
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending confirmation email:", error);
                reject(error);
            } else {
                console.log("Confirmation email sent:", info.response);
                resolve(info);
            }
        });
    });
};

// Function to send order notification email
export const sendOrderNotificationEmail = async (order) => {
    const orderDetails = order._doc || order;

    const mailOptions = {
        from: {
            name: "TechMania",
            address: process.env.EMAIL_USER,
        },
        replyTo: process.env.ADMIN_EMAIL,
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
                    `- ${item.productId?.name } (Quantity: ${item.quantity}, Price: ৳${item.price})`
            )
            .join("\n")}
`,
        html: `
<p>A new order has been placed.</p>
<p>Order ID: ${orderDetails._id || 'N/A'}</p>
<p>Order Date: ${new Date(orderDetails.createdAt || Date.now()).toLocaleString()}</p>
<p>Customer Name: ${order.customerName || 'N/A'}</p>
<p>Customer Email: ${order.customerEmail || 'N/A'}</p>
<p>Customer Phone: ${order.customerPhone || 'N/A'}</p>
<p>Total Price: ৳${(orderDetails.total || 0).toFixed(2)}</p>
<p>Items:</p>
<ul>
${orderDetails.items
            .map(
                (item) =>
                    `<li>${item.productId?.name } (Quantity: ${item.quantity}, Price: ৳${item.price})</li>`
            )
            .join("")}
</ul>
`,
    };

    // Verify the transporter
    await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                console.error("Error verifying transporter:", error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    // Send the email
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending notification email:", error);
                reject(error);
            } else {
                console.log("Notification email sent:", info.response);
                resolve(info);
            }
        });
    });
};