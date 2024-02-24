import React from "react";
import "../../Css/Button.css"


function Button(props) {
    return (
        <button className="CustomButton" onClick={props.onClick}>{props.buttonName}</button>
    )
}

export default Button