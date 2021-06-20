import React from 'react'
import EditButton from '../OrderActions/EditButton/EditButton'
import DeleteButton from '../OrderActions/DeleteButton/DeleteButton'
import ViewButton from '../OrderActions/ViewButton/ViewButton'

const OrderActions = ({ order }) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <ViewButton order={order}/>
            <EditButton  order={order} />
            <DeleteButton  order={order}/>
        </div>
    )
}

export default OrderActions
