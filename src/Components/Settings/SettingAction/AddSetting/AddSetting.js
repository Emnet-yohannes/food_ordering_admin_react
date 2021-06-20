
import { useState } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import ref from "../../../../firebase/firebase";
import 'firebase/firestore';

export default function FormDialog({ settings,actionkey }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    key: Yup.string().required("key is Required"),
    value: Yup.string().required("subject is Required"),
   
  });

  // ref.collection("orders").onSnapshot((querySnapshot) => {
  //   const items = [];
  //   querySnapshot.forEach((doc) => {
  //     items.push(doc.data());
  //   });
  //   setOrders(items);
  // });

  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("settings").add({
        key: values.key,
        value: values.value,

    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      key: "",
      value: "",

    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      // const key = values.key
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleEdit(updatedOrders)
      handleUpdate(values)
      handleClose();
    },
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        startIcon={<EditIcon />}
        style={{ marginRight: "10px",backgroundColor:"darkgreen",color:"white" }}
      >
        Add Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">{actionkey}</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Settings</DialogContentText>

            <Grid container>
              <Grid item xs={5}>
                <Box m={2}>
                  <Typography align="left">key</Typography>
                  <TextField
                    id="outlined-basic"
                    name="key"
                    required
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">value</Typography>
                  <TextField
                    id="outlined-basic"
                    name="value"
                    required
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
