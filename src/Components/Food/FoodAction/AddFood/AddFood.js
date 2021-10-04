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
import Alert from '@material-ui/lab/Alert';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodCategoryArray, setFoodCategoryArray] = useState([])
  const [checkBoxError, setCheckBoxError] = useState();
  const [radioButtonError , setRadioButtonError] = useState();
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
  var messageError = "";

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



  var checkBox ;
  function parseInputCheckbox(value) {
    try {
   if(value===undefined || value===""){
     return checkBox=[]
   }
   else{

     
   var inputArrays = value.split("\n");
 
   inputArrays.forEach((line) => {
       var categoryName = line.substring(
         line.indexOf("[") + 1,
         line.indexOf("]")
       );
       if (categoryName.length == 0) {
         checkBox =null;
         console.log(checkBox  ,"radio 2 ")
         throw Error("invalid format on radio button ");
       }
       else{

         var items = line.substring(line.indexOf("]") + 1).trim();
         var itemsArray = items.split("-");
         itemsArray.forEach((item) => {
           var itemName = item.substring(0, item.indexOf(":")).trim();
           var itemPrice = item.substring(item.indexOf(":") + 1).trim();
   
   
           if (itemName.length == 0) {

             checkBox =null;
             console.log(checkBox  ,"radio3 ")
             throw Error("invalid format on radio button");
           }
           if (typeof(itemPrice)!="number" && Number.isNaN(+itemPrice) || itemPrice.length == 0) {
             checkBox =null
             console.log(checkBox  ,"radio 4 ")
             throw Error("invalid format on radio button");
           }
           else{
             checkBox =[];
            //  console.log(checkBox  ,"radio1 ")
             checkBox.push({
               cat_name: categoryName,
               extra_name: itemName,
               extra_price: itemPrice,
               type:"checkBox"
             });
           }
           // console.log(checkBox);
         
         });
       }
       // setcheckBox(checkBox)
       console.log(checkBox,"checkerplease 1")
       return checkBox;
     });
   }
 } catch (error) {
   console.log(checkBox,"checkerplease 2")
   // alert(error);
   setCheckBoxError("checkBoxError")

   return null;
 }

 }

 var radioButton = [] ;
 function parseInputRadio(value) {
     try {
    if(value===undefined || value===""){
      return radioButton;
    }
    else{

      
    var inputArrays = value.split("\n");
  
    inputArrays.forEach((line) => {
        var categoryName = line.substring(
          line.indexOf("[") + 1,
          line.indexOf("]")
        );
        if (categoryName.length == 0) {
          radioButton =null;
          console.log(radioButton  ,"radio 2 ")
          throw Error("invalid format on radio button ");
        }
        else{

          var items = line.substring(line.indexOf("]") + 1).trim();
          var itemsArray = items.split("-");
          itemsArray.forEach((item) => {
            var itemName = item.substring(0, item.indexOf(":")).trim();
            var itemPrice = item.substring(item.indexOf(":") + 1).trim();
    
    
            if (itemName.length == 0) {

              radioButton =null;
              console.log(radioButton  ,"radio3 ")
              throw Error("invalid format on radio button");
            }
            if (typeof(itemPrice)!="number" && Number.isNaN(+itemPrice) || itemPrice.length == 0) {
              radioButton =null
              console.log(radioButton  ,"radio 4 ")
              throw Error("invalid format on radio button");
            }
            else{
              console.log(radioButton  ,"radio1 ")
              radioButton.push({
                cat_name: categoryName,
                extra_name: itemName,
                extra_price: itemPrice,
                type:"radioButton"
              });
              return radioButton;
            }
            // console.log(radioButton);
          
          });
        }
        // setradioButton(radioButton)
        // console.log(radioButton,"checkerplease 1")
        // return radioButton;
      });
    }
  } catch (error) {
    console.log(radioButton,"checkerplease 2")
    // alert(error);
    setRadioButtonError("radioButtonError")

    return null;
  }

  }
  const handleUpdate = async (values) => {
    
    const ff = ref.firestore().collection("food");




    var category_name ;
     function foodCategory(value){
       category_name = value.split(',');
    }
    foodCategory(values.food_category_id)
    // var bar = parseInputCheckbox
    // var bar2 = parseInputRadio

    // bar(values.check_boxes)
    // bar2(values.radio_button)
    // console.log(bar())
    parseInputCheckbox(values.check_boxes)
    parseInputRadio(values.radio_button)
    var foodnameLowerCase = values.food_name.toLowerCase();
    // console.log(category_name[0])
    // console.log(values.checkBoxString)
    console.log(radioButton,"radio radio")
    console.log(checkBox,"checkBox")
    if(radioButton !=null && checkBox!=null){

      if(values.check_boxes && values.radio_button){
        ff.add({
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price: values.food_price,
          food_category_id: category_name[0],
          food_category_name:category_name[1],
          radioButton,
          checkBox,
          checkBoxString:values.check_boxes,
          radioButtonString:values.radio_button,
          // keywords: values.keywords
        });
      }
      else if(values.check_boxes && values.radio_button==null){
        ff.add({
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price: values.food_price,
          food_category_id: category_name[0],
          food_category_name:category_name[1],
          radioButton,
          checkBox,
          checkBoxString:values.check_boxes,
          // keywords: values.keywords
        });
  
      }
      else if(values.check_boxes==null && values.radio_button){
        ff.add({
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price: values.food_price,
          food_category_id: category_name[0],
          food_category_name:category_name[1],
          radioButton,
          checkBox,
          radioButtonString:values.radio_button,
          // keywords: values.keywords
        });
      }
      else{
        ff.add({
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price: values.food_price,
          food_category_id: category_name[0],
          food_category_name:category_name[1],
          radioButton,
          checkBox,
          // keywords: values.keywords
        });
      }
      formik.resetForm();
      setRadioButtonError(null);
      setCheckBoxError(null);
      handleClose()
    }

  };

  const formik = useFormik({
    initialValues: {
      food_name: "",
      food_description: "",
      food_price: "",
      food_category_id: "",
      radioButton: "",
      checkBox: "",
      keywords: "",
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      // const name = values.name
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleEdit(updatedOrders)
      handleUpdate(values);
      // handleClose();
      
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
                  <div style={{display:"flex"}}>
                  <TextField
                  required
                    autoComplete="off"
                  autoComplete="off"
                    id="outlined-basic"
                    name="food_price"
                    type="number"
                    placeholder="base price"
                    value={formik.values.food_price}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                  <Typography>(Lowest price , then extras will be added on this)</Typography>
                    </div>
                </Box>
                <Box p={2}>
                  <Typography align="left">Food Description</Typography>
                  <TextField
                    autoComplete="off"
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

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} style={{ width: "100%" }} placeholder="please try to avoid spaces " name="radio_button" value={formik.values.radio_button} onChange={formik.handleChange} />
                     {radioButtonError && <Alert severity="error"> check the format again!</Alert>}     
                    </Box>
                  <Box m={2}>
                    <Typography align="left">check Boxes</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} placeholder="please try to avoid spaces " style={{ width: "100%" }} name="check_boxes" value={formik.values.check_boxes} onChange={formik.handleChange} />
                   {checkBoxError && <Alert severity="error"> check the format again!</Alert>} 
                  </Box>
                  {/* <Box m={2}>
                    <Typography align="left">KeyWords</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} name="keywords" style={{ width: "100%" }} value={formik.values.keywords} check_boxes onChange={formik.handleChange} />
                  </Box> */}
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
