import React from "react";
import { useEffect } from "react";
import { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Constants from '../constants/ConstantKeys'
import { SocketProvider, useSocket } from "../context/UserLogin";



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
                console.log(response)
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
    }

    handleOnClickUser = (e) => {
        console.log("inside click")
        this.props.socket.emit("call", {email: e.target.innerText})
    }

    render() {
        console.log("props are")
        console.log(this.props)
        return (
            <ul>
                {this.state.users.map((value)=>{
                    return <button onClick={this.handleOnClickUser}> {value.email} </button>
                })}
            </ul>
        )
    }
}

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    const socket = useSocket()
    useEffect(()=>{
        socket.once("callReceived", (data) => {
            console.log(data)
            const cnf = window.confirm(`call received from ${data.email}`)
            if (cnf) {
                socket.emit("accepted", {email: data.email})
            } else {

            }
        })

        socket.once("callaccepted", (data) => {
            alert(`call accepted by ${data.email}`)
        })
    })
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


