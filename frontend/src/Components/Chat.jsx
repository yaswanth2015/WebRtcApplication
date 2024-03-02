import React, { useContext } from "react"
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { PeerContext, usePeerConnection } from "../context/Peer"


class Chat extends  React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
            remoteStream: null,
        }
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: true,
         })
         .then(stream => {
            this.setState({ stream: stream, remoteStream: this.state.remoteStream })
            this.peerConnection.peer.addTrack
         })
         .catch((err)=> {
            console.log("Error getting user media")
         })
    }


    render(){
        return(
            <>
                <h1>Below is local user</h1>
                {
                    this.state.stream && <ReactPlayer muted url={this.state.stream} height = "300px" width="300px" playing/>
                }
                <h1> below is Remote user </h1>
                {
                    this.state.remoteStream && <ReactPlayer muted url={this.state.remoteStream} height = "300px" width="300px" playing/>
                }
            </>
        )
    }
}

function VideoChat() {
    const peerConnection = useContext(PeerContext)
    return (
        <>
        <Chat peerConnection = {peerConnection} />
        </>
    )
}


export default VideoChat