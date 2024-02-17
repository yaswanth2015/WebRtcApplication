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