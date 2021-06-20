import { makeStyles, useTheme } from '@material-ui/core/styles';
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:"white",
        color:"black",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    
    drawerPaper: {
      width: drawerWidth,
      // backgroundColor:"#1d095e",
      color:"white"
    },
    content: theme.mixins.toolbar,

    content: {
      // flexGrow: 1,
      padding: theme.spacing(3),
      // top:"40%"

    },
  }));
  export default useStyles;