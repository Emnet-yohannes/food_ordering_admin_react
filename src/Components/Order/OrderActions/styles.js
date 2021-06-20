import {makeStyles } from '@material-ui/core'



export default makeStyles(()=>({
    typography : {
        textAlign:"center",
        
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
     },
     card: {
        position: 'relative',
     },
     overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'black',
        backgroundColor: 'white'
     }
}))