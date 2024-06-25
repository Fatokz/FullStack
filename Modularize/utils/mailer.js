const nodemailer = require("nodemailer")

const Forgotpasswordmail = async (Otp, email, username) => {

    const messageTemplate = `
    <div>
        <h2>Reset your password here</h2>
        <ul>
        <li> Name: ${username}</li>
        <li> E-mail: ${email}</li>
        </ul>
        <div>
        <p>Dear ${username},</p>
        <p>Kindly use this code <b>${Otp}</b> to reset your password</p> 
        </div>
    </div>
    `;

    const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASS
        }
    })

    const mailOptions = {
        from: process.env.USER_MAIL,
        to: email,
        subject: "Reset password",
        text: "Test App",
        html: messageTemplate
    };

    try {
        const mail = await transporter.sendMail(mailOptions)
        if (mail) {
            console.log("OTP sent");
        }
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}

module.exports = { Forgotpasswordmail }