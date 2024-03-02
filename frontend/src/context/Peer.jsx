
import { useContext } from "react";
import { useMemo } from "react";
import { createContext } from "react";


export const PeerContext = createContext(null);

export const PeerProvider = (props) => {
    const peer = useMemo(() => {
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
    

    const createPeerOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }

    const createPeerAnswer = async (offer) => {
        const remoteDescription = new RTCSessionDescription(offer)
        await peer.setRemoteDescription(remoteDescription)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }

    const setLocalDescription = async (answer) => {
        await peer.setRemoteDescription(new RTCSessionDescription(answer))
    }

    const sendStream = (stream) => {
        const tracks = stream.getTracks();
        for(const track of tracks) {
            peer.addTrack(track, stream);
        }
    }

    return (
        <PeerContext.Provider value={ { peer, createPeerOffer, createPeerAnswer, setLocalDescription, sendStream } }>
            {props.children}
        </PeerContext.Provider>
    )
}

export const usePeerConnection = () => {
    const { peer, createPeerOffer, createPeerAnswer, setLocalDescription, sendStream } = useContext(PeerContext)
    return { peer, createPeerOffer, createPeerAnswer, setLocalDescription, sendStream }
}
