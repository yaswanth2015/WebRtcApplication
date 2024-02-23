import React from "react";
import TextField from "./TextField"
import "../Css/Login.css"
import Button from "./Button";


function signUp() {
    return (
        <div className="Login">
            <TextField />
            <TextField />
            <TextField />
            <Button />
        </div>
    )
}