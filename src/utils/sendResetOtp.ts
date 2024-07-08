import nodemailer from "nodemailer";

const sendResetOtp = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetOtp;
