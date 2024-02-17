import React from "react";
import "../Css/Button.css"


function Button(props) {
    return (
        <button class="CustomButton" onClick={props.onClick}>{props.buttonName}</button>
    )
}

export default Button