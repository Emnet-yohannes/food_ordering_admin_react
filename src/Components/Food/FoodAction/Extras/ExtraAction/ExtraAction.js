import React from 'react'
import EditExtra from './EditExtra/EditExtra'
import DeleteExtra from './DeleteExtra/DeleteExtra'

const ExtraAction = ({ extra}) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <EditExtra  extra={extra}/>
            {/* <FoodDelete  food={food}/> */}
            <DeleteExtra extra={extra}/>
        </div>
    )
}

export default ExtraAction
