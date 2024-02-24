import { useMemo } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { io } from 'socket.io-client'
import * as Constants from "../constants/ConstantKeys"

export const UserLoginContext = createContext(null)

export const UserLoginProvider = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <UserLoginContext.Provider value={ {email, setEmail, password, setPassword} }>
            {props.children}
        </UserLoginContext.Provider>
    )
}

export const UserSignUpContext = createContext(null)

export const UserSignUpProvider = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    return (
        <UserSignUpContext.Provider value={{email, setEmail, password, setPassword,name, setName }}>
            {props.children}
        </UserSignUpContext.Provider>
    )
}

export const SocketContext = createContext(null)

export const SocketProvider = (props) => {
    const socket = useMemo(() => io(`http://${window.location.hostname}:8001`, {
        auth: {
            token: localStorage.getItem(Constants.TOKEN_KEY)
        }
    }),[])
    return (
        <SocketContext.Provider value = { socket }>
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}