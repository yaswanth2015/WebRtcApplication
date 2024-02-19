const express = require("express")
const User = require("../model/User")
const router = express.Router()


router
    .route("/login")
    .post(async (req,res) => {
        const email = req.body.email
        const password = req.body.password
        console.log("login request")
        if(!email || !password) {
            return res.status(404).json({
                "error": "user not found"
            })
        }
        const user  = await User.findOne({
            email: email,
            password: password
        })
        if(!user) {
            return res.status(401).json({
                "error": "Invalid User or Password"
            })
        }
        return res.status(200).json({
            "message": "User found"
        })
    })


module.exports = router