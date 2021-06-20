
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
export default function FormDialog({ food }) {
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
    food_name: Yup.string().required("Name is Required"),
    food_description: Yup.string().required("subject is Required"),
    food_price:Yup.string().required("price is required")

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

    ref.firestore().collection("food").doc(food.id).update({
        food_name: values.food_name,
        food_description: values.food_description,
        food_price:values.food_price
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      food_name: food.food_name,
      food_description: food.food_description,
      food_price:food.food_price
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
        // style={{width:"100px",height:"100%" }}
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
          <DialogTitle id="form-dialog-title">Food </DialogTitle>
          <DialogContent>
            <DialogContentText>please edit food</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_name"
                    value={formik.values.food_name}
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
                    name="food_description"
                    value={formik.values.food_description}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">price</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_price"
                    value={formik.values.food_price}
                    onChange={formik.handleChange}
                    variant="outlined"
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
