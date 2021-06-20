import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete'
import { useLocation, useParams } from "react-router";
import ref from '../../../../../../firebase/firebase'
import 'firebase/firestore';
export default function FormDialog({extra}) {
  const [open, setOpen] = React.useState(false);
  const params = useParams()
  //console.log(open)

  // const deleteOrder = () => {
  //     const orderRef = firebase.database().ref('orders').child(orders.id);
  //     orderRef.remove();
  //   };
 const handleDelete = () =>{
    ref.firestore().collection("food").doc(params.id).collection("extras").doc(extra.id).delete();
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