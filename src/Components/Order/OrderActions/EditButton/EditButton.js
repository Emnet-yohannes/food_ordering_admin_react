
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
import OrderActions from "../OrderActions";
import ref from "../../../../firebase/firebase";

export default function FormDialog({ order }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    // order_date: Yup.string().required("Name is Required"),
    customer_name: Yup.string().required("subject is Required"),
    order_status:Yup.string().required("order status is required"),
    payment_status: Yup.string().required("email is Required"),
    status: Yup.string().required("message is Required"),

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

    ref.firestore().collection("orders").doc(order.id).update({
        // order_date: values.order_date,
        order_for: values.customer_name,
        // id: values.id,
        order_status:values.order_status,
        payment_status: values.payment_status,
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      // order_date: order.order_date,
      order_status:order.order_status,
      customer_name: order.customer_name,
      // id: order.id,
      payment_status: order.payment_status,
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      //console.log("hiiiiii");
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
          <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
          <DialogContent>
            <DialogContentText>please edit order</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                {/* <Box m={2}>
                  <Typography align="left">date</Typography>
                  <TextField
                    id="outlined-basic"
                    name="order_date"
                    required
                    value={formik.values.order_date}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box> */}
                <Box p={2}>
                  <Typography align="left">Customer Name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="customer_name"
                    required
                    value={formik.values.customer_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>

                <Box p={2}>
                  <Typography align="left">Order Status</Typography>
                  <NativeSelect
                    fullWidth
                    name="order_status"
                    id="demo-customized-select-native"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.order_status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Rejected">Rejected</option>

          
                  </NativeSelect>
                </Box>
                <Box p={2}>
                  <Typography align="left">Payment Status</Typography>
                  {/* <TextField
                    id="outlined-basic"
                    name="payment_status"
                    required
                    value={formik.values.payment_status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  /> */}
                  <NativeSelect
                    fullWidth
                    name="payment_status"
                    id="demo-customized-select-native"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.payment_status}
                  >
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
          
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
