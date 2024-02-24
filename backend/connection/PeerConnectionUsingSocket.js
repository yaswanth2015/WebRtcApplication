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

    //data should contain email
    socket.on("call",async (data) => {
        const user = await User.findOne({
            email: data.email
        })
        socket.broadcast.to(user.socketID).emit("callReceived", {
            email: socket.user.email
        })
    })

    socket.on("accepted",async (data)=>{
        const user = await User.findOne({
            email: data.email
        })
        socket.broadcast.to(user.socketID).emit("callaccepted", {
            email: socket.user.email
        })
    })

    socket.on("rejected",(data) => {
        socket.broadcast.to(User.findOne({
            email: data.email
        }))
    })
}


module.exports = handelUserConnectedToSocket