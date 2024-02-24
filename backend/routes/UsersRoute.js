const express = require("express")
const { $where } = require("../model/User")
const router = express.Router()
const User = require("../model/User")


router.
    route("/users")
    .get(async (req,res) => {
        console.log("users requested")
        const allUsers = await User.find({ 
            email: {
                $ne: req.user.email
            },
            socketID: {
                $ne: null
            }
         }).select(["email", "name"]);
        return res.status(200).json(allUsers)
    })
    



module.exports = router