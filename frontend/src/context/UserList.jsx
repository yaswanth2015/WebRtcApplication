import { createContext } from "react";
import { useState } from "react";

export const UserListContext = createContext(null)


export const UserListProvider = (props) => {
    const [userList, setUserList] = useState(null)

    return (
        <UserListContext.Provider value={ {userList, setUserList} }>
            {props.children}
        </UserListContext.Provider>
    )
}