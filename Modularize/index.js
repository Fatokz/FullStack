const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const ejs = require("ejs")
const cors = require("cors")
const router = require("./Route/userroute")
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(express.json({ extended: true, limit: "100mb" }))
app.set("view engine", "ejs")
app.use("/user", router)

const {verify} = require("./Middleware/sessionservice")


const uri = process.env.URI
const connect = () => {
    try {
        const connection = mongoose.connect(uri)
        if (connection) {
            console.log("connected to database");
        }
    } catch (error) {
        console.log(error);
    }
}

connect()


const port = process.env.PORT

const connection = app.listen(port, () => {
    console.log(`app started on port ${port}`);
})

const socket = require("socket.io")

const io = socket(connection, {
    cors: { origin: "*" }
})

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("authenticate", async (token)=>{
        console.log(token);
        const email = await verify(token)
        console.log(email);
    })

    socket.on("newmessage", (chat) => {
        console.log(chat);
        socket.emit("receivedchat", chat)
    })
})
