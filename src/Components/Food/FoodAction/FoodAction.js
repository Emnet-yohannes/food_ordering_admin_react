import React from 'react'
import FoodEdit from './EditFood/EditFood'
import FoodDelete from './DeleteFood/DeleteFood'
import Extras from './Extras/Extras'
import AddFoodSize from './AddFoodSize/AddFoodSize'
import { NavLink } from "react-router-dom";
import {Route,BrowserRouter as Router, useRouteMatch,useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core';

const FoodAction = ({ food}) => {
    let { path, url } = useRouteMatch();
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            {/* <Extras component={NavLink} to={`${path}/extras`} food={food}/> */}
            <Button component={NavLink}  to={`${path}/extra/${food.id}`} startIcon={<VisibilityIcon />} style={{ marginRight: "10px" ,backgroundColor:"darkgreen",color:"white",width:"100px",height:"27px" ,marginTop:"12px"}}>
            Extras
            </Button>
            <FoodEdit  food={food}/>
            <FoodDelete  food={food}/>
            <AddFoodSize food={food}/>
        </div>
    )
}

export default FoodAction
