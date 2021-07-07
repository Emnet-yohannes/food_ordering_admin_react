import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {Box ,Typography} from '@material-ui/core'
// import 'firebase/firestore';
// import ref from '../../../../firebase/firebase'
import firebase from '../../firebase/firebase'


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [inputField , setInputField] = React.useState({
    email: '',
    password: ''
})

//  const handleDelete = () =>{
//   ref.firestore().collection("drivers").doc(driver.id).delete();
//   handleClickOpen()

//  }
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const inputsHandler = (e) =>{
  setInputField( {[e.target.name]: e.target.value} )
}
const handleChange=()=>{
  const user = firebase.auth().currentUser;
  // console.log(user.email);


  // const newPassword = getASecureRandomPassword();

user.updatePassword(inputField.password).then(() => {
  // Update successful.
  handleClose()
  // console.log(user)
  alert("password changed succesfully")

}).catch((error) => {
  // An error ocurred
  handleClose()
  alert(error.message)
  // console.log(error)
  // ...
});

// user.updateEmail(inputField.email).then(() => {
//   // Update successful
//   handleClose()
//   alert("password changed succesfully")
//   // ...
// }).catch((error) => {
//   // An error occurred
//   handleClose()
//   alert(error.message)
//   console.log(error)
//   // ...
// });

}

  return (
    <div>
      <Button onClick={handleClickOpen} 
      variant="contained"
      color="inherit"
      size="small"
      startIcon={<LockOpenIcon />}>
          change password
    </Button>



      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
         <form >

        <DialogTitle id="form-dialog-title">Delete driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure You want to change your user name or password
          </DialogContentText>
          <Box p={2}>
                  {/* <Typography align="left">email</Typography>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    required
                    value={inputField.email}
                    onChange={inputsHandler} 
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                  </TextField>
                </Box>
                <Box p={2}> */}
                  <Typography align="left">new password</Typography>
                  <TextField
                    id="outlined-basic"
                    type="password"
                    name="password"
                    required
                    value={inputField.password}
                    onChange={inputsHandler} 
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                  </TextField>
                </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
          <Button color="primary" variant="contained" onClick={handleChange}>
            change
          </Button>
        </DialogActions>
         </form>
      </Dialog>
    </div>
  );
}