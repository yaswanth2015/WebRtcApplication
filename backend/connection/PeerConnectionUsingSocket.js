const User = require("../model/User")


async function handelUserConnectedToSocket(socket) {
    const email = socket.user.email
    const name = socket.user.name
    User.findOneAndUpdate({
        email: email
    }, {
        socketID: socket.id
    })
    console.log(`${socket.user.name} is connected to socket`)
    socket.on("disconnect", (data) => {
        console.log(`${socket.user.name} is disconnected from socket`)
    })

    //data should contain email
    socket.on("call", (data) => {
        socket.broadcast.to(User.findOne({
            email: data.email
        }).socketID).emit("callReceived", {
            email: email
        })
    })

    socket.on("accepted", (data)=>{
        socket.broadcast.to(User.findOne({
            email: data.email
        })).emit("callaccepted", data)
    })

    socket.on("rejected",(data) => {
        socket.broadcast.to(User.findOne({
            email: data.email
        }))
    })
}


module.exports = handelUserConnectedToSocket