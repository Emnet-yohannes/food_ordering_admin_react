import { useState,useEffect } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import {NativeSelect} from '@material-ui/core'
import { useLocation, useParams } from "react-router";
import Radio from '@material-ui/core/Radio';
import * as Yup from "yup";
import ref from "../../../../../../firebase/firebase";
import 'firebase/firestore';
export default function FormDialog({ extra }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [foodCategory ,setFoodCategory] = useState("");
  const [foodCategoryArray , setFoodCategoryArray] = useState([])
  const getAllFoodCategory = () => {
    setLoading(true);
    ref.firestore().collection("food_category").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setFoodCategoryArray(items);
      
      setLoading(false);
    });
  };

 useEffect(() => {
   getAllFoodCategory()

 }, [])
  const params = useParams()
  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    extra_name: Yup.string().required("Name is Required"),
    extra_price:Yup.string().required("price is required")

  });

  const handleUpdate = async (values) => {
    // const updateRef = ref.collection("orders").child(order.id);

    ref.firestore().collection("food").doc(params.id).collection("extras").add({
        extra_name: values.extra_name,
        extra_price:values.extra_price,
        extra_option:values.extra_option,
        food_category_id:values.food_category_id
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      extra_name: "",
      extra_price:"",
      extra_option:"",
      food_category_id:''
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
            setLoading(true);

      // const name = values.name
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleAdd(updatedOrders)
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
        startIcon={<AddIcon />}
        color="primary"
        style={{ marginRight: "10px" ,backgroundColor:"darkgreen"}}
      >
        Add Extra
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Extra </DialogTitle>
          <DialogContent>
            <DialogContentText>please Add extra</DialogContentText>

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
                <Box p={2}>
                  <Typography align="left">Food Category</Typography>
                  <NativeSelect
                  name="food_category_id"
          id="demo-customized-select-native"
          onChange={formik.handleChange}
          style={{width:"100%"}}
          value={formik.values.food_category_id}
        >
          {/* <option aria-label="None" value="" />
          <option value="ten">Ten</option>
          <option value="twenty">Twenty</option>
          <option value="thirty">Thirty</option> */}
          <option aria-label="None" value=""/>
          {foodCategoryArray.map((fcategory=>(
            <option value={fcategory.id}>{fcategory.category_name}</option>
          )))}
        </NativeSelect>
                </Box>
                <Box p={2}>
                  <Typography align="left">extra_option</Typography>
                  
                  <RadioGroup aria-label="extra_option" name="extra_option" value={formik.values.extra_option} onChange={formik.handleChange}>
    <FormControlLabel value="RadioButtons" control={<Radio />} label="Radio Buttons" />
    <FormControlLabel value="CheckBox" control={<Radio />} label="CheckBox" />
   
  </RadioGroup>
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
