import React from "react";
import "../../Css/Button.css"


function Button(props) {
    return (
        <button className={props.className} class = {props.class} onClick={props.onClick}>{props.buttonName}</button>
    )
}

export default Button