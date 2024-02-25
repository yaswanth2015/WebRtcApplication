import React from "react";
import TextField from "./partial/TextField"
import "../Css/Login.css"
import Button from "./partial/Button";
import { useContext } from "react";
import { UserSignUpContext } from "../context/UserLogin";
import { useNavigate } from "react-router-dom";


function SignUp() {
    const userSignupDetails = useContext(UserSignUpContext)
    const navigate = useNavigate()
    function handleUserDetails(e) {
        switch (e.target.id) {
            case "email" :
                userSignupDetails.setEmail(e.target.value)
                break;
            case "password":
                userSignupDetails.setPassword(e.target.value)
                break;
            case "name":
                userSignupDetails.setName(e.target.value) 
                break;
            default:
                break;
        }
    }

    function resetValues() {
        userSignupDetails.setEmail("")
        userSignupDetails.setPassword("")
        userSignupDetails.setName("")
    }

    function handleSignUp(e) {
        const email = userSignupDetails.email
        const password = userSignupDetails.password
        const name = userSignupDetails.name
        fetch(`http://${window.location.hostname}:8000/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
            })
        }).then(async (response) => {
            const responseBody = await response.json()
            if(response.status === 201) {
                alert(responseBody.message)
                resetValues()
                navigate("/")
            } else {
                alert(responseBody.error)
                resetValues()
            }
            
        }).catch((error)=>{
            console.log(error)
            alert(`error occured ${error} status ${error.status}`)
            resetValues()
        })

    }
    return (
        <div className="Login">
            <TextField id="email" type="email" placeholder="Enter Email" value = {userSignupDetails.email} onChange = {handleUserDetails}/>
            <TextField id="name" type="text" placeholder="Enter name" value = {userSignupDetails.name} onChange = {handleUserDetails}/>
            <TextField id="password" type="password" placeholder="Enter password" value = {userSignupDetails.password} onChange = {handleUserDetails}/>
            <Button className = "CustomButton" buttonName = "SignUp" onClick = {handleSignUp}/>
        </div>
    )
}


export default SignUp