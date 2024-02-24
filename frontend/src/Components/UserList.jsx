import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
                    console.log(userList)
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
            console.log(`connected`)
    }

    handleOnClickUser = (e) => {
        console.log("inside click")
        
        this.props.socket.emit("call", {email: e.target.innerText})
    }

    componentWillUnmount() {
        this.props.socket.disconnect()
    }

    render() {
        return (
            <ul>
                {this.state.users.map((value)=>{
                    return <button className="UserButton" onClick={this.handleOnClickUser}> {value.email} </button>
                })}
            </ul>
        )
    }
}

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    const socket = useSocket()

    useEffect(()=>{
        const handleCallAccepted = (data) => {
            alert(`call accepted by ${data.email}`)
        }
        const handleCallReceived = (data)=>{
            console.log(data)
            const cnf = window.confirm(`call received from ${data.email}`)
            if (cnf) {
                socket.emit("accepted", {email: data.email})
            } else {
    
            }
        }
        socket.on("callReceived",handleCallReceived)
        socket.on("callaccepted", handleCallAccepted)
        return () => {
            socket.off("callReceived", handleCallReceived)
            socket.off("callaccepted",handleCallAccepted)
        }
    },[])
    return(
        <UserList navigateTo = {navigateTo} socket = {socket}/>
    )
}



function UserListWithSocketProvider() {
    return (
    <SocketProvider>
        <UserListWithNavigate />
    </SocketProvider>)
}

export default UserListWithSocketProvider


