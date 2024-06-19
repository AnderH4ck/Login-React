// import nodemailer from "nodemailer";
//  import dotenv from "dotenv";
//  dotenv.config();

//  export const transporter = nodemailer.createTransport({
//    host: 'smtp.gmail.com',
//    post: 587,
//    secure: true,
//    auth: {
//      user: "jackmessaging@gmail.com",
//      pass: "eywx prai wqzc ozkf",
//    },
//  });

//  export const sendPasswordResetEmail = (email, token) => {
//    const url = `http://localhost:5173/resetPassword/${token}`;

//    return transporter.sendMail({
//      from: process.env.EMAIL,
//      to: email,
//      subject: "Password Reset",
//      html: `<h1>Reset your password</h1>
//             <p>Click the link below to reset your password:</p>
//             <a href="${url}">${url}</a>`,
//    });
//  };

// const nodemailer = require("nodemailer");

