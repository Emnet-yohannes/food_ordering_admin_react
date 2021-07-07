import React from 'react';
import Menu from '../Menu/Menu'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PasswordChange from '../ChangeUserAndPassword/ChangeUserAndPassword';
import FoodCategory from '../FoodCategory/FoodCategory'
import MenuIcon from '@material-ui/icons/Menu';
import {Button,Box} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useStyles from './styles'
import  routes from '../../Routes'
import  { useState, useEffect } from 'react';
import { Switch } from 'react-router';
import {Route,BrowserRouter as Router, useRouteMatch,useLocation} from 'react-router-dom';
import Food from '../Food/Food'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Order from '../Order/order'
import Driver from '../DeliveryBoy/DeliveryBoy'
import Extras from '../Food/FoodAction/Extras/Extras'
import DashBoard from '../DashBoard/DashBoard'
import UserManagement from '../UserManagement/UserManagement'
import Settings from '../Settings/Settings'
import Avatar from '@material-ui/core/Avatar';
import ref from '../../firebase/firebase'
import 'firebase/firestore';
function ResponsiveDrawer(props) {

  let { path, url } = useRouteMatch();
  const location = useLocation();
  const [orderPath, setorderPath] = useState('')

  //console.log(location);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />


      <List>
        
       { routes
        .map((route, index) => (
          // <ListItem button key={route.label}>
            // {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            // <ListItemText primary={text} /> */}
            <Menu text={route.label} 
                  icon={route.icon}
                  path={`${url}/${route.path}`}
                  subitems={route.subitems}
                  route={route}
                  
            />
            
        ))}
      </List>
      {/* <Divider /> */}
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>


          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            
            <MenuIcon />
          </IconButton>
          
          <Box  width="100%" height="100%" display="flex" justifyContent="space-between">
          <Typography variant="h4" noWrap >
            Food Ordering
          </Typography>
          <Box display="flex" justifyContent="space-around">
            
        <Button
        onClick={function(){
          ref.auth().signOut();
          localStorage.removeItem("uid");
        }}
        startIcon={<ExitToAppIcon />
        
        }
      >
        Logout
      </Button>
      <PasswordChange />
          </Box>
          </Box>
          
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={`${path}/allOrders`}>
          <Order orderPath={'allOrders'}/>
          </Route>
          <Route exact path={`${path}/pendingOrders`}>
          <Order orderPath={'pendingOrders'}/>
          </Route>
          <Route exact path={`${path}/acceptedOrders`}>
          <Order orderPath={'acceptedOrders'}/>
          </Route>
          <Route exact path={`${path}/preparedOrders`}>
          <Order orderPath={'preparedOrders'}/>
          </Route>
          <Route exact path={`${path}/deliveredOrders`}>
          <Order orderPath={'deliveredOrders'}/>
          </Route>
          <Route exact path={`${path}/rejectedOrders`}>
          <Order orderPath={'rejectedOrders'}/>
          </Route>
          <Route path={`${path}/driver`}>
            <Driver />
          </Route>
          <Route exact path={`${path}/foodCategory`}>
            <FoodCategory />
          </Route>
          <Route exact path={`${path}/food`}>
            <Food />
          </Route>
          <Route exact strict path={`${path}/food/extra/:id`}>
            <Extras/>
          </Route>
          <Route exact path={`${path}/dashboard`}>
            <DashBoard />
          </Route>
          <Route exact path={`${path}/management`}>
            <UserManagement />
          </Route>
          <Route exact path={`${path}/settings`}>
            <Settings />
          </Route>
        </Switch>
      </main>
    </div>

  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
