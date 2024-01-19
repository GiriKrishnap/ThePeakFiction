const nodemailer = require("nodemailer");
require("dotenv").config();
const OtpModel = require('../model/otpModel');
//................................................


const transporter = nodemailer.createTransport({
    host: process.env.HOST_STRING,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_STRING,
        pass: process.env.MAIL_PASSWORD
    }
});

//................................................

const sendOtp = async (email) => {
    try {
    
        const generatedOtp = Math.floor(1000 + Math.random() * 9000);

        await OtpModel.create({
            email: email,
            otp: generatedOtp,
            createdAt: new Date()
        })



        const mailOptions = {
            from: 'yt4smallgames@gmail',
            to: email,
            subject: 'ThePeakFiction verification OTP',
            html: `<P> Hello,<br><br>
            We just need to verify your email address before you can access our Website<br><br>
            Your otp - <h4>${generatedOtp}</h4><br><br>
            Thanks for the visit ! - <h3>ThePeakFiction team ☺</h3></P>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("email has been send:- ", info.response);
            }
        })

    } catch (error) {
        console.log("catch error on sendOtp - ", error.message);
    }
}

module.exports = { sendOtp }