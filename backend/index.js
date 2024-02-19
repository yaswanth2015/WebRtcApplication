const { Server } = require("socket.io")
const { createServer } = require("http")
const connectToDatabase = require("./connectToDatabase")
const express = require("express")
const router = require("./routes/UserRoute")
const bodyParser =  require("body-parser")

const app = express()
const socketServer = new Server(createServer())

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
app.use("", router)



// ####### Handle Connections  #######

socketServer.on("connect", (data) =>{
    console.log(`User Connected`)
})



// ######## Listen Ports #########
app.listen(APIPORT, () => {
    console.log(`Server Started on ${APIPORT}`)
})

socketServer.listen(SOCKETPORT)





