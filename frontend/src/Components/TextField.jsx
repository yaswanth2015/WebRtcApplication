import { UserLoginContext } from '../context/UserLogin'
import { useContext } from 'react'
import '../Css/TextField.css'



function TextField(props) {
    const userContext = useContext(UserLoginContext)
    function handleChange(e) {
        if (e.target.type === "email")
        {
            userContext.setEmail(e.target.value)
        } else if (e.target.type === "password") {
            userContext.setPassword(e.target.value)
        }
    }
    return (
        <input className='TextField' type={props.type} onChange = {handleChange} placeholder = {props.placeholder} value = {props.value}></input>
    )
}

export default TextField