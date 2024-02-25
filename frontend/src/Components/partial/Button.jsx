import React from "react";
import "../../Css/Button.css"


function Button(props) {
    return (
        <button class = {props.class} className={props.className} onClick={props.onClick}>{props.buttonName}</button>
    )
}

export default Button