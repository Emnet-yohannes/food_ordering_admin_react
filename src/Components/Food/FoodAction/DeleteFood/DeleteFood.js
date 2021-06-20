import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete'
import 'firebase/firestore';
import ref from '../../../../firebase/firebase'

export default function FormDialog({food}) {
  const [open, setOpen] = React.useState(false);
  // //console.log(open)

  // const deleteOrder = () => {
  //     const orderRef = firebase.database().ref('orders').child(orders.id);
  //     orderRef.remove();
  //   };
 const handleDelete = () =>{
  ref.firestore().collection("food").doc(food.id).delete();
  handleClickOpen()

 }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} 
      variant="contained"
      color="secondary"
      size="small"
      // style={{ marginLeft: "10px",width:"100%",height:"100%" }}
      style={{marginLeft:"10px"}}
      startIcon={<DeleteIcon />}>
          Delete
    </Button>



      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete food</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure You want to delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}