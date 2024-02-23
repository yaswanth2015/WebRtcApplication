const express = require("express")
const router = express.Router()
const User = require("../model/User")


router.
    route("/users")
    .get(async (req,res) => {
        const allUsers = await (await User.where("email").ne(req.user.email).select(["name", "email", "-_id"]))
        return res.status(200).json(allUsers)
    })
    



module.exports = router