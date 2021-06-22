
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
import {NativeSelect} from '@material-ui/core'
import 'firebase/firestore';
export default function FormDialog({ user }) {
  const [open, setOpen] = React.useState(false);
  const [user_status, setuser_status] = useState()
  const [loading, setLoading] = useState(false);
  //   //console.log(open)

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

  // ref.collection("orders").onSnapshot((querySnapshot) => {
  //   const items = [];
  //   querySnapshot.forEach((doc) => {
  //     items.push(doc.data());
  //   });
  //   setOrders(items);
  // });

  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("user").doc(user.id).update({
        user_name: values.user_name,
        user_email: values.user_email,
        phone_number:values.phone_number,
        user_status:values.user_status
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
          user_name: user.user_name,
          user_email: user.user_email,
          phone_number:user.phone_number,
          user_status:user.user_status
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
            setLoading(true);

      // const name = values.name
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
        color="primary"
        startIcon={<EditIcon />}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title"> user</DialogTitle>
          <DialogContent>
            <DialogContentText>please edit user</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="user_name"
                    v
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">Email</Typography>
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
                  <Typography align="left">Phone</Typography>
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
                  <Typography align="left">status</Typography>
                  {/* <TextField
                    id="outlined-basic"
                    name="user_status"
                    value={formik.values.user_status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  /> */}




<NativeSelect
                  name="user_status"
          id="demo-customized-select-native"
          onChange={formik.handleChange}
          style={{width:"100%"}}
          value={formik.values.user_status}
        >
          {/* <option aria-label="None" value="" />
          <option value="ten">Ten</option>
          <option value="twenty">Twenty</option>
          <option value="thirty">Thirty</option> */}
          <option aria-label="None" value=""/>
         
            <option value="Active">Active</option>
            <option value="suspended">suspended</option>
          
        </NativeSelect>




                </Box>
              </Grid>
      
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
