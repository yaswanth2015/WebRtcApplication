
import React from "react";
import TextField from "./partial/TextField"
import "../Css/Login.css"
import Button from "./partial/Button"
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLogin"
import { useNavigate } from 'react-router-dom'
import * as Constants from '../constants/ConstantKeys'

function Login(props) {
    const userDetails = useContext(UserLoginContext)
    const navigate = useNavigate()
    localStorage.removeItem(Constants.TOKEN_KEY)
    function handleLogin(e) {
        const userEmail = userDetails.email;
        const userPassword = userDetails.password
        //Fetch API Details and redirect
        fetch(`http://${window.location.hostname}:8000/login`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify( {
                email: userEmail,
                password: userPassword,
            })
        }).then(async (response) => {
            const responseBody = await response.json()
            if (response.status === 200) {
                localStorage.setItem(Constants.TOKEN_KEY,responseBody.token)
                navigate(`/${responseBody.name}`)
            } else {
                alert(responseBody.error)
            }
            userDetails.setEmail("")
            userDetails.setPassword("")
        }).catch((error) => {
            console.log(error)
            alert(`error occured ${error} status ${error.status}`)
            userDetails.setEmail("")
            userDetails.setPassword("")
        })
    }
    function handleUserDetails(e) {
        if (e.target.type === "email")
        {
            userDetails.setEmail(e.target.value)
        } else if (e.target.type === "password") {
            userDetails.setPassword(e.target.value)
        }
    }
    function handleNavigation(e) {
        navigate("/signup") 
    }
    return (
        <div className="Login">
            <TextField type = "email" placeholder="User Email" value= { userDetails.email } onChange = {handleUserDetails}/>
            <TextField type = "password" placeholder = "Password" value= { userDetails.password } onChange = {handleUserDetails}/>
            <Button className = "CustomButton" buttonName = "Login" onClick = { handleLogin }/>
            <Button className = "CustomButton" buttonName="Go To SignUp" onClick = { handleNavigation } />
        </div>
    )
}


export default Login