import { UserLoginContext } from '../context/UserLogin'
import { useContext } from 'react'
import '../Css/TextField.css'



function TextField(props) {
    return (
        <input className='TextField' type={props.type} placeholder = {props.placeholder} value = {props.value} onChange = {props.onChange}></input>
    )
}

export default TextField