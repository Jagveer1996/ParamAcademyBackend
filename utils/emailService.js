const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jaythakur843@gmail.com',
        pass: 'ifhq eheb bkby dror' // use app password if using Gmail with 2FA
    }
});

const sendStudentCreationMail = async (studentEmail, studentName) => {
    const mailOptions = {
        from: 'jaythakur843@gmail.com',
        to: studentEmail,
        subject: 'Student Registered Successfully',
        html: `<p>Hi <b>${studentName}</b>,</p>
           <p>Your registration was successful!</p>`
    };

    await transporter.sendMail(mailOptions);
};
const sendResetMail = async (email, resetLink) => {
    const mailOptions = {
        from: 'jaythakur843@gmail.com',
        to: email,
        subject: 'password reset link',
        html: `<p>reset link:- <b>${resetLink}</b>,</p>
           `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendStudentCreationMail,sendResetMail };
