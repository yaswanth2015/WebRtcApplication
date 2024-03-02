import React from "react";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Constants from '../constants/ConstantKeys'
import { SocketProvider, useSocket } from "../context/UserLogin";
import "../Css/UserButton.css"
import Button from "./partial/Button";
import { usePeerConnection } from "../context/Peer";



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
        this.props.peer.setLocalDescription(data.answer).then((val) => {
            this.props.navigateTo(`connect`)
        }).catch((error)=>{
            console.log(`error occures setting local description answer`)
        })
    }

    handleCallReceived = async (data)=>{
        const cnf = window.confirm(`call received from ${data.email}`)
        if (cnf) {
            this.props.peer.createPeerAnswer(data.offer).then((answer) => {
                this.props.socket.emit("accepted", {
                    email: data.email,
                    answer: answer
                })
                this.props.navigateTo(`connect`)
            }).catch((error)=>{
                console.log("Error in creating answer")
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
        this.props.peer.createPeerOffer().then((Offer)=>{
            this.props.socket.emit("call", {
                email: e.target.innerText,
                offer: Offer
            })
        }).catch((error) => {
            console.log(`Error in creating offer`)
        })
    }

    componentWillUnmount() {
        this.props.socket.off("callReceived", this.handleCallReceived)
        this.props.socket.off("callaccepted", this.handleCallAccepted)
        this.props.socket.off("callRejected", this.handleCallRejected)
        this.props.socket.disconnect()
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
            </>
        )
    }
}

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    const socket = useSocket()
    const params = useParams()
    const peer = usePeerConnection()
    return( 
    <>
        <h1>This is {params.userId}</h1>
        <UserList navigateTo = {navigateTo} socket = {socket} userId={params.userId} peer = {peer}/>
    </>
        
    )
}



function UserListWithSocketProvider() {
    return (
    <SocketProvider>
        <UserListWithNavigate />
    </SocketProvider>)
}

export default UserListWithSocketProvider


