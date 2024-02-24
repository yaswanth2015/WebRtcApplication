import React from "react";
import { useEffect } from "react";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Constants from '../constants/ConstantKeys'
import { SocketProvider, useSocket } from "../context/UserLogin";
import "../Css/UserButton.css"



class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        fetch(`http://${window.location.hostname}:8000/users`, {
                method: "GET",
                headers: {
                    'content-type':"application/json",
                    token: localStorage.getItem(Constants.TOKEN_KEY)
                },
                mode: 'cors',
            }).then(async (response)=>{
                const userList = await response.json()
                if (response.status === 200) {
                    this.setState({
                        users: userList
                    })
                } else {
                    alert(`user is not authorized please login from login screen`)
                    this.props.navigateTo("/")
                }
            }).catch((error)=>{
                alert(`Error occured please try again ${error}`)
                this.props.navigateTo("/")
            })
            this.props.socket.connect()
            console.log(`socket connected`)
    }

    handleOnClickUser = (e) => {
        this.props.socket.emit("call", {email: e.target.innerText})
    }

    componentWillUnmount() {
        this.props.socket.disconnect()
    }

    render() {
        return (<>
            <ul>
                {this.state.users.map((value)=>{
                    return <button className="UserButton" onClick={this.handleOnClickUser} key = {value.email}> {value.email} </button>
                })}
            </ul>
            </>
        )
    }
}

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    const socket = useSocket()
    const params = useParams()
    useEffect(()=>{
        const handleCallAccepted = (data) => {
            alert(`call accepted by ${data.email}`)
        }
        const handleCallReceived = (data)=>{

            const cnf = window.confirm(`call received from ${data.email}`)
            if (cnf) {
                //send peer data here
                socket.emit("accepted", {email: data.email})
            } else {
                socket.emit("rejected", {
                    email: data.email
                })
            }
        }
        const handleCallRejected = (data)=>{
            alert(`call is rejected by ${data.email}`)
        }
        socket.on("callReceived",handleCallReceived)
        socket.on("callaccepted", handleCallAccepted)
        socket.on("callRejected", handleCallRejected)
        return () => {
            socket.off("callReceived", handleCallReceived)
            socket.off("callaccepted",handleCallAccepted)
            socket.off("callRejected", handleCallRejected)
        }
    })
    return( 
    <>
        <h1>This is {params.userId}</h1>
        <UserList navigateTo = {navigateTo} socket = {socket}/>
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


