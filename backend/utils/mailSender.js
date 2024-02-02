import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
export const sendMail = (email, otp, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
  })

  const mailOptions = {
    from: "projectnexpay@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Dear NexPay User,\n\nYour One-Time Password (OTP) is: ${otp}\n\nPlease use this OTP to securely access your account.Protect your account by not sharing this OTP with anyone.\n\nBest regards,\nThe NexPay Team`,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error)
    } else {
      console.log("Email sent:", info.response)
      return res.status(200).send("OTP send successfully..")
    }
  })
}
