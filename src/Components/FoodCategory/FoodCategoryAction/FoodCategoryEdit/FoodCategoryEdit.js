
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
export default function FormDialog({ foodCategory }) {
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
    // order_number:

  });



  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("food_category").doc(foodCategory.id).update({
        category_name: values.category_name,
        category_description: values.category_description,
        order_number:values.order_number
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };
  console.log(foodCategory.order_number)
  const formik = useFormik({
    initialValues: {
      category_name: foodCategory.category_name,
      category_description: foodCategory.category_description,
      order_number: foodCategory.order_number
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
        startIcon={<EditIcon />}
        style={{ marginRight: "10px" }}
        color="primary"
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
          <DialogTitle id="form-dialog-title">Food Category</DialogTitle>
          <DialogContent>
            <DialogContentText>please edit foodCategory</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="category_name"
                    required
                    autoComplete="off"
                    value={formik.values.category_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">Description</Typography>
                  <TextField
                   id="outlined-basic"
                   name="category_description"
                   required
                   autoComplete="off"
                   value={formik.values.category_description}
                   onChange={formik.handleChange}
                   variant="outlined"
                   style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">Order Number</Typography>
                  <TextField
                    id="outlined-basic"
                    name="order_number"
                    type="number"
                    value={formik.values.order_number}
                    onChange={formik.handleChange}
                    variant="outlined"
                    autoComplete="off"
                    style={{ width: "100%" }}
                  />
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
