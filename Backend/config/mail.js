import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_Pass

        
    },
})


const sendMail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: 'Reset your password',
            html: `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
        });
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


export default sendMail;