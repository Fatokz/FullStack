const express = require("express")
const router = express.Router()
const usermodel = require("../Model/usermodel")
const {Signup, Login, verifyuser, upload, Forgotpassword, Resetpassword} = require("../controllers/Usercontroller")

router.post("/register", Signup)
router.post("/login", Login)
router.get("/verify", verifyuser)
router.post("/upload", upload)
router.post("/forgot", Forgotpassword)
router.post("/reset", Resetpassword)


module.exports = router 