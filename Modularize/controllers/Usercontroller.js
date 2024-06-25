// const { default: Dashboard } = require("../../frontend/src/Dashboard")
const usermodel = require("../Model/usermodel")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const crypto = require("crypto")
const { Forgotpasswordmail } = require("../utils/mailer")


const Signup = async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
        res.status(400).send({ message: "Input field cannot be empty", status: false })
    }
    try {
        const existuser = await usermodel.findOne({ email })
        if (existuser) {
            res.status(402).send({ message: "User already exist", status: false })
        } else {
            let hashedpassword = await bcrypt.hash(password, 10)
            console.log(hashedpassword);
            const newuser = await usermodel.create({ firstname, lastname, email, password: hashedpassword })
            if (newuser) {
                res.status(200).send({ message: `Signup Successful ${firstname}`, status: true })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}

const Login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    if (!email, !password) {
        res.status(400).send({ message: "Input field cannot be empty", status: false })
    }
    try {
        const verifyuser = await usermodel.findOne({ email })
        console.log(verifyuser);
        if (!verifyuser) {
            res.status(402).send({ message: "not a signed up user pls register", status: false })
        } else {
            let comparepassword = await bcrypt.compare(password, verifyuser.password)
            console.log(comparepassword);
            if (!comparepassword) {
                res.status(405).send({ message: "Incorrect password", status: false })
            } else {
                let token = await jwt.sign({ email }, "secret", { expiresIn: "1day" })
                console.log(token);
                res.status(200).send({ message: `Welcome ${verifyuser.firstname}`, username: verifyuser.firstname, token, status: true })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}


const verifyuser = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1]
        if (!token) {
            res.status(400).send({ message: "invalid token", status: false })
        }
        const verify = await jwt.verify(token, "secret")
        console.log(verify);
        if (verify) {
            res.status(200).send({ message: "verification successful", status: true })
        }
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
        console.log(error);
    }
}

const upload = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1]
        let verifyuser = jwt.verify(token, "secret")
        if (!verifyuser) {
            res.status(400).send({ message: "error verifing token", status: false })
        }
        console.log(verifyuser);
        const email = verifyuser.email
        const { imagefile } = req.body
        const newimage = await cloudinary.uploader.upload(imagefile)
        if (!newimage) {
            res.status(400).send({ message: "error uploading image", status: false })
        }
        const update = await usermodel.findOneAndUpdate(
            { email },
            { profile: newimage.secure_url },
            { new: true }
        )
        console.log(update);
        let image = update.profile
        if (!update) {
            res.status(403).send({ message: "user not found", status: false })
        }
        return res.status(200).send({ message: "image upload successful", status: true, image })
    } catch (error) {
        console.log(error.message);
    }
}


const Forgotpassword = async (req, res) => {
    console.log(req.body);
    const { email } = req.body
    try {
        if (!email) {
            res.status(400).send({ message: "email is required", status: false })
        }
        const user = await usermodel.findOne({ email })
        console.log(user);
        const username = user.firstname
        const otps = await crypto.randomBytes(3)
        const Otp = otps.toString("hex")
        await Forgotpasswordmail(Otp, email, username)
        console.log(Otp);
        res.status(200).send({ message: "OTP sent successfully", Otp, email, status: true })
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}


const Resetpassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body
        if (email == "" || password == "") {
            res.status(400).send({ message: "email or password is empty", status: false })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const updated = await usermodel.findOneAndUpdate(
            {email},
            {$set:{password: hashpassword}}
        )
        if (!updated) {
            res.status(405).send({message:"Unable to reset password", status:false})
        }
        else{
            return res.status(200).send({message:"Password reset successful", status:true})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message, status:false})
    }
}


module.exports = { Signup, Login, verifyuser, upload, Forgotpassword, Resetpassword }