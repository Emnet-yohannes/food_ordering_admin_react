import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CategoryIcon from '@material-ui/icons/Category';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GavelIcon from '@material-ui/icons/Gavel';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';

const Routes = [
    {
        label:"DashBoard",
        path:'dashboard',
        icon:DashboardIcon ,
        selectedIndex:1

    
    },
    {
        label:"DriverManagement",
        path:'driver',
        icon: LocalShippingIcon,
        selectedIndex:2
    
    },
    {

        label:"OrderManagement",
        icon: GavelIcon,
        path:'allOrders',
        selectedIndex:3,
        subitems: [
            // {
            //     id: 1,
            //     name: "All Order",
            //     path:'allOrders',
            // },
            {
                id: 2,
                name: "Pending Order List",
                path:'pendingOrders',
            },

            {
                id: 2,
                name: "Accepted Order List",
                path:'acceptedOrders',
            },
            {
                id: 3,
                name: "Prepared Order List ",
                path:'preparedOrders',
            },
            {
                id: 4,
                name: "Delivered Order List",
                path:'deliveredOrders',
            },
            {
                id: 1,
                name: "Rejected Order List",
                path:'rejectedOrders',
            },
        ]
    },
    {
        label:"FoodCategory",
        path:'foodCategory',
        icon: CategoryIcon,
        selectedIndex:4
 
    
    },
    {

        label:"Food",
        path:'food',
        icon: FastfoodIcon,
        selectedIndex:5
        
    },
    {

        label:"User Management",
        path:'management',
        icon: AccountBoxIcon,
        selectedIndex:6,

    },
    {

        label:"settings",
        path:'settings',
        icon: SettingsIcon,
        selectedIndex:7,

    },
    


]
export default Routes;