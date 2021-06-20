import { useState,useEffect } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import { Button, InputLabel, NativeSelect } from "@material-ui/core";
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
import { setGridPageActionCreator } from "@material-ui/data-grid";

export default function FormDialog() {
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
//console.log(foodCategoryArray)

  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange =(event)=>{
    setFoodCategory(event.target.value)
    //console.log(foodCategory)
  }


  const schema = Yup.object().shape({
    food_name: Yup.string().required("Name is Required"),
    food_description: Yup.string().required("subject is Required"),
    food_price: Yup.string().required("price is required"),
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

    ref.firestore().collection("food").add({
      food_name: values.food_name,
      food_description: values.food_description,
      food_price: values.food_price,
      food_category_id: values.food_category_id
    });

    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      food_name: "",
      food_description: "",
      food_price: "",
      food_category_id:""
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      // const name = values.name
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleEdit(updatedOrders)
      handleUpdate(values);
      handleClose();
    },
  });

  return (
    //approve_status
    //online_status
    //status
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        
        startIcon={<AddIcon />}
        style={{ marginRight: "10px",backgroundColor:"darkGreen" ,color:"white"}}
      >
        Add Food
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Food</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Food</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">Food Name</Typography>
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
                  <Typography align="left">Food Description</Typography>
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
                  <Typography align="left">Food price</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_price"
                    value={formik.values.food_price}
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
