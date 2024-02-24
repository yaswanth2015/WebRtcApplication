import { createContext } from 'react'
import { useState } from 'react'

export const UserLoginContext = createContext(null)

export const UserLoginProvider = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    return (
        <UserLoginContext.Provider value={ {email, setEmail, password, setPassword} }>
            {props.children}
        </UserLoginContext.Provider>
    )
}

export const UserSignUpContext = createContext(null)

export const UserSignUpProvider = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    return (
        <UserSignUpContext.Provider value={{email, setEmail, password, setPassword,name, setName }}>
            {props.children}
        </UserSignUpContext.Provider>
    )
}