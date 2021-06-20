import React from "react";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Button,Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const Menu = (props) => {
    let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (event,index) => {
    setOpen(!open);
  };

  return (
    <div
      
      style={{
        width: "100%",
        backgroundColor: "inherit",
        color: "#666666",
        textDecoration: "none",
        padding:"5px 10px",
        '&:hover': {
       borderRadius: "25px"
    }
      }} //activeStyle={{color:"white" ,backgroundColor:"#ed4f2f"}}
    >

      <ListItem component={NavLink} to={`${props.path}`}  button onClick={(event)=>handleClick(event)}  activeStyle={{color:"white" ,backgroundColor:"#2E2D57",borderRadius: "25px",boxShadow: "5px 10px" }}>
        <ListItemIcon>
        {<props.icon style={{color:"#666666"}} />}
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6" >{props.text}</Typography>}/>
        {props.route.hasOwnProperty("subitems")? open ? <ExpandLess /> : <ExpandMore /> : null}
        
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List  component="div" disablePadding>
            {props.route.hasOwnProperty("subitems") &&
            props.subitems.map((subitem)=>(
                
          <ListItem component={NavLink}
          to={`${path}/${subitem.path}`}
          activeStyle={{color:"white" ,backgroundColor:"#160245",borderRadius: "25px",boxShadow: "5px 10px"}}
          exact button className={classes.nested}>

            <ListItemText primary={subitem.name} />

            
          </ListItem>
            ))}
        </List>
      </Collapse>
    </div>
  );
};

export default Menu;

