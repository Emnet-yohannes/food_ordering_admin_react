import React from 'react'
import DriverEdit from './DriverEdit/DriverEdit'
import DriverDelete from './DriverDelete/DriverDelete'

const DriverActions = ({ driver, actionName}) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <DriverEdit  driver={driver} actionName={actionName}/>
            <DriverDelete  driver={driver}/>
        </div>
    )
}

export default DriverActions
