import React from 'react'
import FoodCategoryEdit from './FoodCategoryEdit/FoodCategoryEdit'
import FoodCategoryDelete from './FoodCategoryDelete/FoodCategoryDelete'

const DriverActions = ({ foodCategory}) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <FoodCategoryEdit  foodCategory={foodCategory}/>
            <FoodCategoryDelete  foodCategory={foodCategory}/>
        </div>
    )
}

export default DriverActions
