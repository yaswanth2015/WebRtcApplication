import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import ReactPlayer from 'react-player'
import '../../Css/Streaming.css'
import Button from "./Button"


function Streaming(props) {
    function handleStop(e) {
        props.stream.getTracks().forEach(element => {
            element.stop()
        });
    }
    return (
        <>
            {
                props.stream && <ReactPlayer playing height="300px" width="300px" url={props.stream}/>
            }
        </>
    )
}

export default Streaming