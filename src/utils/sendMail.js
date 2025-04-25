import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',  
        secure: false,               
        port: 2525,
        auth: {
            user: "0a4e975ad6554b",
            pass: "7a20d1e21acc84"
        }
    });

    await transporter.sendMail({
        from: `"Zee Commerce" <no-reply>`,
        to,
        subject,
        text,
        html,
    });
};

export default sendEmail;
