import React from "react";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Constants from '../constants/ConstantKeys'
import { SocketProvider, useSocket } from "../context/UserLogin";
import "../Css/UserButton.css"
import Button from "./partial/Button";
import { PeerProvider, usePeerConnection } from "../context/Peer";
import ReactPlayer from 'react-player'



class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    fetchDetails = () => {
        fetch(`http://${window.location.hostname}:8000/users`, {
                method: "GET",
                headers: {
                    'content-type':"application/json",
                    token: localStorage.getItem(Constants.TOKEN_KEY),
                    name: this.props.userId
                },
                mode: 'cors',
            }).then(async (response)=>{
                const userList = await response.json()
                if (response.status === 200) {
                    this.setState({
                        users: userList
                    })
                    this.props.socket.connect()
                } else {
                    alert(`user is not authorized please login from login screen`)
                    this.props.navigateTo("/")
                }
            }).catch((error)=>{
                alert(`Error occured please try again ${error}`)
                this.props.navigateTo("/")
            })
    }

    handleCallAccepted = async (data) => {
        alert(`call accepted by ${data.email}`)
        this.props.peerHelper.setAnswer(data.answer).then((val) => {
            console.log(this.props.peerHelper)
        }).catch((error)=>{
            console.log(`error occures setting local description answer`)
            console.log(error)
        })
    }

    handleCallReceived = async (data)=>{
        const cnf = window.confirm(`call received from ${data.email}`)
        if (cnf) {
            this.props.peerHelper.startLocalStream().then((stream)=> {
                this.props.peerHelper.sendLocalStream(stream)
                this.props.peerHelper.setConnectedEmail(data.email)
                this.props.peerHelper.createPeerAnswer(data.offer).then((answer) => {
                    this.props.socket.emit("accepted", {
                        email: data.email,
                        answer: answer
                    })
                    
                }).catch((error)=>{
                    console.log("Error in creating answer")
                })
            }).catch((error)=>{
                console.log("Error in starting local stream for answer")
            })
        } else {
            this.props.socket.emit("rejected", {
                email: data.email
            })
        }
    }

    handleCallRejected = (data)=>{
        alert(`call is rejected by ${data.email}`)
    }

    handleUserJoined = (data)=>{
        window.alert(`User Joined Please refresh the screen`)
    }

    setUpSockets() {
        this.props.socket.on("callReceived", this.handleCallReceived)
        this.props.socket.on("callaccepted", this.handleCallAccepted)
        this.props.socket.on("callRejected", this.handleCallRejected)
    }

    componentDidMount() {
        this.fetchDetails()
        this.setUpSockets()
    }

    handleOnClickUser = async (e) => {
        this.props.peerHelper.startLocalStream().then((stream) => {
            this.props.peerHelper.sendLocalStream(stream)
            this.props.peerHelper.setConnectedEmail(e.target.innerText)
            console.log(`connected Email ${this.props.peerHelper.connectedEmail}`)
            this.props.peerHelper.createPeerOffer().then((offer)=>{
                this.props.peerHelper.setOffer(offer)
                this.props.socket.emit("call", {
                    email: e.target.innerText,
                    offer: offer
                })
            }).catch((error) => {
                console.log(`Error in creating offer`)
                console.log(error)
            })
            
        })  
    }

    componentWillUnmount() {
        this.props.socket.off("callReceived", this.handleCallReceived)
        this.props.socket.off("callaccepted", this.handleCallAccepted)
        this.props.socket.off("callRejected", this.handleCallRejected)
    }

    render() {
        return (
            <>
                <ul>
                    {
                        this.state.users.map((value)=>{
                            return <Button className="" class ="btn btn-link" buttonName = {value.email} onClick = {this.handleOnClickUser} key = {value.email}/>
                        })
                    }
                </ul>
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

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    const socket = useSocket()
    const params = useParams()
    const peerHelper = usePeerConnection()
    return( 
    <>
        <h1>This is {params.userId}</h1>
        <UserList navigateTo = {navigateTo} socket = {socket} userId={params.userId} peerHelper = {peerHelper}/>
    </>
        
    )
}



function UserListWithSocketProvider() {
    return (
    <SocketProvider>
        <PeerProvider>
        <UserListWithNavigate />
        </PeerProvider>
    </SocketProvider>)
}

export default UserListWithSocketProvider


