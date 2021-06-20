import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import OrderTable from './Table'


import ref from "../../../../firebase/firebase";

export default function FormDialog({ order }) {
  const [open, setOpen] = React.useState(false);
  // //console.log(order.id);

  // const deleteOrder = () => {
  //     const orderRef = firebase.database().ref('orders').child(orders.id);
  //     orderRef.remove();
  //   };
  const handleDelete = () => {
    ref.firestore().collection("orders").doc(order.id).delete();
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        color="primary"
        style={{ marginRight: "10px", backgroundColor: "darkgreen" }}
        startIcon={<VisibilityIcon />}
      >
        View
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title" style={{textAlign:"center"}}>Order Detail</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
              Are You sure You want to delete
            </DialogContentText> */}
            <OrderTable order={order}/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancle
          </Button>
          {/* <Button onClick={handlePrint} color="primary">
            Print
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

