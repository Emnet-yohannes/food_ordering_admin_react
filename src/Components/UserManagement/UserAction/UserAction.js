import React from 'react'
import EditUser from './EditUser/EditUser'
import DeleteUser from './DeleteUser/DeleteUser'

const DriverActions = ({ user}) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <EditUser  user={user}/>
            <DeleteUser  user={user}/>
        </div>
    )
}

export default DriverActions
