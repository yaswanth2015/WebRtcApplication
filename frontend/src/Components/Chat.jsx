import React, { useContext } from "react"
import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { PeerContext, PeerProvider, usePeerConnection } from "../context/Peer"


class Chat extends  React.Component {
    
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <>
                <h1>Below is local user</h1>
                {
                    this.props.peerHelper.localStream && <ReactPlayer muted url={this.props.peerHelper.localStream} height = "300px" width="300px" playing/>
                }
                <h1> below is Remote user </h1>
                {
                    this.props.peerHelper.remoteStream && <ReactPlayer muted url={this.props.peerHelper.remoteStream} height = "300px" width="300px" playing/>
                }
            </>
        )
    }
}

function VideoChat() {
    const peerHelper = usePeerConnection()
    return (
        <>
            <PeerProvider>
                <Chat peerHelper = {peerHelper} />
            </PeerProvider>
        </>
    )
}


export default VideoChat