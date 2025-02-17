// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendMail = async ({ email, html, subject }) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.MY_EMAIL,
//       pass: process.env.MY_PASSWORD,
//     },
//   });
//   const info = await transporter.sendMail({
//     from: '"CodeHireX" <Codehirex@gmail.com>',
//     to: email,
//     subject: subject,
//     html: html,
//   });



// module.exports = sendMail;
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ email, html, subject }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"CodeHireX" <Codehirex@gmail.com>', // Use your verified email
      to: email,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
