const User = require("../model/User")


async function handelUserConnectedToSocket(socket) {
    const email = socket.user.email
    const name = socket.user.name
    const user = await User.findOneAndUpdate({
        email: email
    }, {
        socketID: socket.id
    })
    console.log(`${socket.user.name} is connected to socket`)

    socket.on("disconnect", async (data) => {
        const user = await User.findOneAndUpdate({
            email: socket.user.email,
        }, {
            socketID: null
        })
        console.log(`${socket.user.name} is disconnected from socket`)
    })

    socket.on("call:negotation",async (data) => {
        const user = await User.findOne({
            email: data.email
        })
        console.log("negotion offer")
        console.log(data)
        socket.to(user.socketID).emit("incoming-call:negotion", {
            email: socket.user.email,
            offer: data.offer,
        })
    })

    socket.on("accepted:negotion", async (data) => {
        const user = await User.findOne({
            email: data.email
        })
        socket.to(user.socketID).emit("received-accepted:negotion", {
            answer: data.answer
        })
    })

    //data should contain email
    socket.on("call",async (data) => {
        const user = await User.findOne({
            email: data.email
        })
        console.log(`call from ${socket.user.email} to ${data.email}`)
        socket.to(user.socketID).emit("callReceived", {
            email: socket.user.email,
            offer: data.offer,
        })
    })

    socket.on("accepted", async (data)=>{
        const user = await User.findOne({
            email: data.email
        })
        socket.to(user.socketID).emit("callaccepted", {
            email: socket.user.email,
            answer: data.answer,
        })
    })

    socket.on("rejected",async (data) => {
        const user = await User.findOne({
            email: data.email
        })
        socket.to(user.socketID).emit("callRejected", {
            email: socket.user.email
        })
    })
}
module.exports = handelUserConnectedToSocket