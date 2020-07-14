const nodemailer = require("nodemailer");

require("dotenv").config();
const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

module.exports = (data) => {
  const mailOptions = {
    from: NODEMAILER_EMAIL,
    ...data,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) reject(new Error("Error internal server (Email)"));
      else resolve(true);
    });
  });
};
