
import React from "react";
import TextField from "./TextField"
import "../Css/Login.css"
import Button from "./Button"
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLogin"

function Login(props) {
    const userDetails = useContext(UserLoginContext)
   function handleLogin(e) {
        const userEmail = userDetails.email;
        const userPassword = userDetails.password
        //Fetch API Details and redirect
        userDetails.setEmail("")
        userDetails.setPassword("")
   }
    return (
        <div className="Login">
            <TextField type = "email" placeholder="User Email" value= { userDetails.email }/>
            <TextField type = "password" placeholder = "Password" value= { userDetails.password }/>
            <Button buttonName = "Login" onClick = { handleLogin }/>
        </div>
    )
}

export default Login