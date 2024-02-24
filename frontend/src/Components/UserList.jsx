import React from "react";
import { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Constants from '../constants/ConstantKeys'
import { SocketProvider } from "../context/UserLogin";


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

    render() {
        return (
            <ul>
                {this.state.users.map((value)=>{
                    return <NavLink className="NavLink" to={"/"}> {value.email} </NavLink>
                })}
            </ul>
        )
    }
}

function UserListWithNavigate() {
    const navigateTo = useNavigate()
    return(
        <SocketProvider>
            <UserList navigateTo = {navigateTo}/>
        </SocketProvider>
    )
}

export default UserListWithNavigate


