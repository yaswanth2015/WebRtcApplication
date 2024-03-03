
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { useSocket } from "./UserLogin";


export const PeerContext = createContext(null);

export const PeerProvider = (props) => {
    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    const [connectedEmail, setConnectedEmail] = useState(null)
    const [offer, setOffer] = useState(null)
    const socket = useSocket()
    const peerConnection = useMemo(() => {
        return new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }
            ]
        })
    }, [])

    useEffect(()=>{
        const handleNegotionNeeded =async () => {
            console.log(`OPSDOPSY NegotioionNeeded from ${connectedEmail} `)
            console.log(offer)
                if(connectedEmail) {  
                    socket.emit("call:negotation", {
                        email: connectedEmail,
                        offer: offer
                    })
                }
            }
        peerConnection.addEventListener('negotiationneeded', handleNegotionNeeded)

        return () => {
            peerConnection.removeEventListener('negotiationneeded', handleNegotionNeeded)
        }
    },[offer])

    useEffect(()=>{
       
        
        const handleTrackEvent = (event) => {
            setRemoteStream(event.streams[0])
        }

        const handleIncomingCallNegotion = (data) => {
            console.log("negotiation offer")
            console.log(data.offer)
            createPeerAnswer(data.offer).then((answer) => {
                socket.emit("accepted:negotion", {
                    answer: answer,
                    email: data.email
                })
            }).catch((error)=>{
                console.log("error in creating answer for negotion")
                console.log(error)
            })
        }

        const handleAcceptedNegotion = (data) => {
            setAnswer(data.answer).then(()=>{
                console.log("Negotion completed successfully")
            }).catch((error)=>{
                console.log("error in setting answer")
                console.log(error)
            })
        }

        socket.on("received-accepted:negotion", handleAcceptedNegotion)
        socket.on("incoming-call:negotion" ,handleIncomingCallNegotion)
        
        peerConnection.addEventListener('track',handleTrackEvent)
        return () => {
            
            peerConnection.removeEventListener('track', handleTrackEvent)
            socket.off("incoming-call:negotio", handleIncomingCallNegotion)
            socket.off("received-accepted:negotion", handleAcceptedNegotion)
        }
    },[connectedEmail, offer])

    const startLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true})
            setLocalStream(stream)
            return stream
        } catch(error) {
            console.log("Error In starting Local Sream")
            console.log(error)
            return null
        }
    }
    
    const sendLocalStream = (stream) => {
        for(const track of stream.getTracks()) {
            peerConnection.addTrack(track, stream)
        }
    }

    const createPeerOffer = async () => {
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        return offer
    }

    const createPeerAnswer = async (offer) => {
        const remoteDescription = new RTCSessionDescription(offer)
        await peerConnection.setRemoteDescription(remoteDescription)
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        return answer
    }

    const setAnswer = async (answer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    }

    return (
        <PeerContext.Provider value={ {setConnectedEmail, connectedEmail, peerConnection, startLocalStream, sendLocalStream, createPeerOffer,  createPeerAnswer, setAnswer, localStream, remoteStream, setOffer, offer } }>
            {props.children}
        </PeerContext.Provider>
    )
}

export const usePeerConnection = () => useContext(PeerContext)
