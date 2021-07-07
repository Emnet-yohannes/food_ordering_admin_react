import { useState, useEffect } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import { Button, InputLabel, NativeSelect } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
  const [foodCategory, setFoodCategory] = useState("");
  const [foodCategoryArray, setFoodCategoryArray] = useState([])
  // const[checkBox,setcheckBox]= useState([""]); 
  // const[radioButton,setradioButton]= useState([""]); 
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
  const handleChange = (event) => {
    setFoodCategory(event.target.value)
    //console.log(foodCategory)
  }


  const schema = Yup.object().shape({
    food_name: Yup.string().required("Name is Required"),
    food_description: Yup.string().required("subject is Required"),
    food_price: Yup.string().required("price is required"),
  });



  const handleUpdate = async (values) => {

    const ff = ref.firestore().collection("food");

    var checkBox = [];
    function parseInputCheckbox(value) {
    
      var inputArrays = value.split("\n");
      console.log(inputArrays);
    
      inputArrays.forEach(async(line) => {
        try {
          console.log("categoryname");
          var categoryName = line.substring(
            line.indexOf("[") + 1,
            line.indexOf("]")
          );
          if (categoryName.length == 0) {
            throw Error("invalid format");
          }
          var items = line.substring(line.indexOf("]") + 1).trim();
          console.log(categoryName);
          console.log(items);
          var itemsArray = items.split("-");
          itemsArray.forEach((item) => {
            console.log(item);
            var itemName = item.substring(0, item.indexOf(":")).trim();
            var itemPrice = item.substring(item.indexOf(":") + 1).trim();
    
            console.log("ItemName:"+itemName);
            console.log("ItemPrice:"+itemPrice);
    
            if (itemName.length == 0) {
              throw Error("invalid format");
            }
            console.log(typeof(itemPrice));
            console.log(Number.parseFloat(itemPrice));
            if (typeof(itemPrice)!="number" && Number.isNaN(+itemPrice) || itemPrice.length == 0) {
              throw Error("invalid format");
            }
    
            checkBox.push({
              cat_name: categoryName,
              extra_name: itemName,
              extra_price: itemPrice,
              type:"checkbox"
            });
            console.log(checkBox);
            
          });
          // await setcheckBox(checkBox)
          console.log(checkBox)
          return checkBox;
        } catch (error) {
          console.log(error);
          alert("invalid format");
          return null;
        }
      });
    }



    var radioButton = [];
     function parseInputRadio(value) {
    
      var inputArrays = value.split("\n");
      console.log(inputArrays);
    
      inputArrays.forEach((line) => {
        try {
          console.log("categoryname");
          var categoryName = line.substring(
            line.indexOf("[") + 1,
            line.indexOf("]")
          );
          if (categoryName.length == 0) {
            throw Error("invalid format");
          }
          var items = line.substring(line.indexOf("]") + 1).trim();
          console.log(categoryName);
          console.log(items);
          var itemsArray = items.split("-");
          itemsArray.forEach((item) => {
            console.log(item);
            var itemName = item.substring(0, item.indexOf(":")).trim();
            var itemPrice = item.substring(item.indexOf(":") + 1).trim();
    
            console.log("ItemName:"+itemName);
            console.log("ItemPrice:"+itemPrice);
    
            if (itemName.length == 0) {
              throw Error("invalid format");
            }
            console.log(typeof(itemPrice));
            console.log(Number.parseFloat(itemPrice));
            if (typeof(itemPrice)!="number" && Number.isNaN(+itemPrice) || itemPrice.length == 0) {
              throw Error("invalid format");
            }
    
            radioButton.push({
              cat_name: categoryName,
              extra_name: itemName,
              extra_price: itemPrice,
              type:"radioButton"
            });
            // console.log(radioButton);
            
          });
          // setradioButton(radioButton)
          console.log(radioButton)
          return radioButton;
        } catch (error) {
          console.log(error);
          alert("invalid format");
          return null;
        }
      });
    }
    var category_name ;
     function foodCategory(value){
       category_name = value.split(',');

       console.log(category_name)
    }
    foodCategory(values.food_category_id)
    parseInputCheckbox(values.check_boxes)
    parseInputRadio(values.radio_button)
    console.log(values.food_category_id)


    ff.add({
      food_name: values.food_name,
      food_description: values.food_description,
      food_price: values.food_price,
      food_category_id: category_name[0],
      food_category_name:category_name[1],
      radioButton,
      checkBox,
      keywords: values.keywords
    });
    

  };

  const formik = useFormik({
    initialValues: {
      food_name: "",
      food_description: "",
      food_price: "",
      food_category_id: "",
      radioButton: "",
      checkBox: "",
      keywords: ""
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
        style={{ marginRight: "10px", backgroundColor: "darkGreen", color: "white" }}
      >
        Add Food
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Food</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Food</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box p={2}>
                  <Box p={2}>
                    <Typography align="left">Food Category</Typography>
                    <NativeSelect
                      required
                      name="food_category_id"
                      id="demo-customized-select-native"
                      variant="contained"
                      onChange={formik.handleChange}
                      style={{ width: "100%" }}
                      value={formik.values.food_category_id}
                    >
                      <option aria-label="None" value="" />
                      {foodCategoryArray.map((fcategory => (
                        <option value={`${fcategory.id},${fcategory.category_name}`}>{fcategory.category_name}</option>
                      )))}
                    </NativeSelect>
                    </Box>
                    <Box p={2}>
                  <Typography align="left">Food Name</Typography>
                  <TextField
                  required
                  autoComplete="off"
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
                  <Typography align="left">Food price</Typography>
                  <TextField
                  required
                  autoComplete="off"
                    id="outlined-basic"
                    name="food_price"
                    value={formik.values.food_price}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">Food Description</Typography>
                  <TextField
                  required
                  autoComplete="off"
                    id="outlined-basic"
                    name="food_description"
                    value={formik.values.food_description}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>

                  <Box p={2}>
                    <Typography align="left">Radio Buttons</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} style={{ width: "100%" }} placeholder="radio buttons" name="radio_button" value={formik.values.radio_button} onChange={formik.handleChange} />
                  </Box>
                  <Box m={2}>
                    <Typography align="left">check Boxes</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} placeholder="check Boxes" style={{ width: "100%" }} name="check_boxes" value={formik.values.check_boxes} onChange={formik.handleChange} />
                  </Box>
                  <Box m={2}>
                    <Typography align="left">KeyWords</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} name="keywords" style={{ width: "100%" }} value={formik.values.keywords} check_boxes onChange={formik.handleChange} />
                  </Box>
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
