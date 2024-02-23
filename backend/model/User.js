const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const UserSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    socketID: {
        required: false,
        type: String,
        default: null
    }
})
const User = mongoose.model("user", UserSchema)
module.exports = User