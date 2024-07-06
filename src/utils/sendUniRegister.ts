import nodemailer from "nodemailer";

const sendUniRegister = async (emails: string, university: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails,
        subject: "University Registration",
        text: `A user has requested to register ${university} as a university. Please confirm this request.`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendUniRegister;
