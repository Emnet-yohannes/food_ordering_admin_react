
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
import { useLocation, useParams } from "react-router";
import ref from "../../../../../../firebase/firebase";
import 'firebase/firestore';
export default function FormDialog({ extra }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams()
  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //console.log(extra.id)

  const schema = Yup.object().shape({
    extra_name: Yup.string().required("Name is Required"),
    // food_description: Yup.string().required("subject is Required"),
    extra_price:Yup.string().required("price is required")

  });


  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("food").doc(params.id).collection("extras").doc(extra.id).update({
        extra_name: values.extra_name,
        // food_description: values.food_description,
        extra_price:values.extra_price
    });

  };

  const formik = useFormik({
    initialValues: {
      extra_name: extra.extra_name,
    //   food_description: extra.food_description,
      extra_price:extra.extra_price
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
          <DialogTitle id="form-dialog-title">Extras </DialogTitle>
          <DialogContent>
            <DialogContentText>please edit Extra</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="extra_name"
                    value={formik.values.extra_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                {/* <Box p={2}>
                  <Typography align="left">Description</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_description"
                    value={formik.values.food_description}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box> */}
                <Box p={2}>
                  <Typography align="left">price</Typography>
                  <TextField
                    id="outlined-basic"
                    name="extra_price"
                    value={formik.values.extra_price}
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
              edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
