const { Server } = require("socket.io")
const { createServer } = require("http")
const connectToDatabase = require("./connectToDatabase")
const express = require("express")
const userLoginRouter = require("./routes/UserLoginRoute")
const UserRoutes = require("./routes/UsersRoute")
const bodyParser =  require("body-parser")
const JWT = require("jsonwebtoken")
const { decode } = require("punycode")
const SECRET_KEY = "WEB_RTC"
const app = express()
const socketServer = new Server(createServer())
const handelUserConnectedToSocket = require("./connection/PeerConnectionUsingSocket")
const SOCKETPORT = 8001
const APIPORT = 8000


// ####### Connect To Database #######
connectToDatabase("mongodb://127.0.0.1:27017/webrtcapplication")


// ####### Assign MiddleWares #######
app.use(bodyParser.json())
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


// ####### Assign routes  ########
app.use("", userLoginRouter)
// Adding Security
app.use(async (req,res,next) => {
    const token = req.headers.token
    JWT.verify(token, SECRET_KEY, (error, decode)=>{
        if(error) {
            return res.status(401).json({
                "error":"Invalid Token"
            })
        }
        req.user = decode
        console.log(decode)
        next()
    })
})
app.use("",UserRoutes)



// ####### Handle Connections  #######

    // ###### Add MiddleWares for Socket #######
socketServer.use(async (socket,next) => {
    JWT.verify(socket.auth.token, SECRET_KEY, (error,decode) => {
        if (error) {
            next(new Error("Invalid token"))
            return
        }
        socket.user = decode
        next()
    })
})


socketServer.on("connection", (socket) =>{
    console.log(`User Connected`)
    handelUserConnectedToSocket(socket)
})



// ######## Listen Ports #########
app.listen(APIPORT, () => {
    console.log(`Server Started on ${APIPORT}`)
})

socketServer.listen(SOCKETPORT)





