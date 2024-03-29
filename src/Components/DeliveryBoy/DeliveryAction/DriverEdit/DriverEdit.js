
import { useState } from "react";
import { TextField, Typography, Grid, Box, Container, NativeSelect } from "@material-ui/core";
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
export default function FormDialog({ driver,actionName }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    phone_number: Yup.string().required("subject is Required"),
    email: Yup.string().required("email is Required"),
    status:Yup.string().required("status is Required"),
    online_status:Yup.string().required("online status is Required"),
    approve_status:Yup.string().required("approve status is Required"),

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

    ref.firestore().collection("drivers").doc(driver.id).update({
        name: values.name,
        last_name:values.last_name,
        phone_number: values.phone_number,
        email: values.email,
        status:values.status,
        online_status:values.online_status,
        approve_status:values.approve_status,
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      name: driver.name,
      last_name: driver.last_name,
      phone_number: driver.phone_number,
      email: driver.email,
      status:driver.status,
      online_status:driver.online_status,
      approve_status:driver.approve_status
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
          <DialogTitle id="form-dialog-title">{actionName}</DialogTitle>
          <DialogContent>
            <DialogContentText>please edit driver</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box p={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">Last Name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="last_name"
                    required
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                  </TextField>
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
                  <Typography align="left">Email</Typography>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">Status</Typography>
                  {/* <TextField
                    id="outlined-basic"
                    name="status"
                    required
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  /> */}
                   <NativeSelect
                    fullWidth
                    name="status"
                    id="demo-customized-select-native"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  >
                    <option aria-label="None" value="" />
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
          
                  </NativeSelect>
                </Box>
                <Box p={2}>
                  <Typography align="left">Online Status</Typography>
                  {/* <TextField
                    id="outlined-basic"
                    name="online_status"
                    required
                    value={formik.values.online_status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  /> */}
                  <NativeSelect
                    fullWidth
                    name="online_status"
                    id="demo-customized-select-native"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.online_status}
                  >
                    <option aria-label="None" value="" />
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
          
                  </NativeSelect>
                </Box>
                <Box p={2}>
                  <Typography align="left">approve_status</Typography>
                  {/* <TextField
                    id="outlined-basic"
                    name="approve_status"
                    required
                    value={formik.values.approve_status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  /> */}
                  <NativeSelect
                    fullWidth
                    name="approve_status"
                    id="demo-customized-select-native"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.approve_status}
                  >
                    <option aria-label="None" value="" />
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
          
                  </NativeSelect>
                </Box>
              </Grid>
              {/* <Grid item xs={6} style={{textAlign:"center"}}>
                        <Box p={2} >
                            <Typography align="left" >
                                Subject
                            </Typography>
                            <TextField id="outlined-basic" name="subject" value={formik.values.subject} onChange={formik.handleChange} variant="outlined" style={{ width: "100%", }} />
                        </Box>
                        <Box p={2} >
                            <Typography align="left" >
                                Message
                            </Typography>
                            <TextField id="outlined-basic" multiline
                            rows={16} 
                            name="message" value={formik.values.message} onChange={formik.handleChange}
                            variant="outlined" 
                            style={{ width: "100%"}} />
                        </Box>

                    </Grid> */}
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
