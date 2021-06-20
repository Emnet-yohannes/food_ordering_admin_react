
import { useState } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import ref from "../../../../firebase/firebase";
import 'firebase/firestore';
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading , setLoading] = useState(false);   

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    user_name: Yup.string().required("Name is Required"),
    user_email: Yup.string().required("subject is Required"),
    phone_number:Yup.string().required("subject is Required"),
    user_status:Yup.string().required("subject is Required"),
    
    

  });


  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("user").add({
        user_name: values.user_name,
        user_email: values.user_email,
        phone_number:values.phone_number,
        user_status:values.user_status,
    });
  };

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      phone_number:"",
      user_status:""
     
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      handleUpdate(values)
      handleClose();
    },
  });

  return (
    <div>
      {/* <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        style={{ marginRight: "10px" }}
      >
        Add User
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">user</DialogTitle>
          <DialogContent>
            <DialogContentText>Add User</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">user Name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="user_name"
                    required
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">user email</Typography>
                  <TextField
                    id="outlined-basic"
                    name="user_email"
                    required
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">user phone number</Typography>
                  <TextField
                    id="outlined-basic"
                    name="phone_number"
                    required
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">user status</Typography>
                  <TextField
                    id="outlined-basic"
                    name="user_status"
                    required
                    value={formik.values.user_status}
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
