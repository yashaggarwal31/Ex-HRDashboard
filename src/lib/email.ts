// const mailOptions = {
//     to: email,
//     subject: "Reset Password",
//     message: text
// };

import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "ADMIN",
    to: options.to,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(mailOptions);
};
