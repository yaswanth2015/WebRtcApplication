const express = require("express")
const User = require("../model/User")
const router = express.Router()
const JWT = require("jsonwebtoken")
const SECRET_KEY = "WEB_RTC"


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
        const token = JWT.sign({
            name: user.name,
            email: user.email
        }, SECRET_KEY)
        return res.status(200).json({
            token: token
        })
    })

router
    .route("/signup")
    .post(async (req,res) => {
        const body = req.body
        console.log(body)
        const email = body.email
        const name = body.name
        const password = body.password
        try {
            const newUser = await User.create({
                email: email,
                name: name,
                password: password
            })
        } catch (error) {
            return res.status(400).json({
                "error": "Bad Request"
            })
        }
        return res.status(201).json({
            "message": "User Created Successfully"
        })
    })
module.exports = router