
import { useState,useEffect } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Alert from '@material-ui/lab/Alert';
import {NativeSelect} from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";
import ref from "../../../../firebase/firebase";
import 'firebase/firestore';
export default function FormDialog({ food }) {
  const [foodCategory ,setFoodCategory] = useState("");
  const [foodCategoryArray , setFoodCategoryArray] = useState([])
  const [category_name,setCategoryName] = useState([])
  const [checkBoxError, setCheckBoxError] = useState();
  const [radioButtonError , setRadioButtonError] = useState();
  const [ErrorMessage ,setErrorMesssage] = useState("");
  const [ErrorMessageCheckBox ,setErrorMessageCheckBox] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

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


  var checkBox ;
  function parseInputCheckbox(value) {
    console.log(value,"initialcheckbox")
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
             console.log(checkBox  ,"radio1 ")
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
     console.log(value,"initial radio")
     try {
    if(value===undefined || value===""){
      return radioButton=[]
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
            }
            // console.log(radioButton);
          
          });
        }
        // setradioButton(radioButton)
        console.log(radioButton,"checkerplease 1")
        return radioButton;
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
    // const updateRef = ref.collection("orders").child(order.id);
    

    var category_name ;
     function foodCategory(value){
       category_name = value.split(',');
    }
    foodCategory(values.food_category_id)
    parseInputCheckbox(values.checkBoxString)
    parseInputRadio(values.radioButtonString)
    console.log(checkBox,"checkbox")
    console.log(radioButton,"radio")
    var foodnameLowerCase = values.food_name.toLowerCase();



    if(radioButton !=null && checkBox!=null){
    
    
      if(values.checkBoxString && values.radioButtonString){

        ref.firestore().collection("food").doc(food.id).update({
    
            food_name: values.food_name,
            food_name_lower_case:foodnameLowerCase,
            food_description: values.food_description,
            food_price:values.food_price,
            food_category_id:category_name[0],
            food_category_name:category_name[1],
            radioButton:radioButton,
            checkBox:checkBox,
            radioButtonString:values.radioButtonString,
            checkBoxString:values.checkBoxString
    
        })
      }else if(values.checkBoxString && values.radioButtonString==null){

        ref.firestore().collection("food").doc(food.id).update({
  
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price:values.food_price,
          food_category_id:category_name[0],
          food_category_name:category_name[1],
          radioButton:radioButton,
          checkBox:checkBox,
          checkBoxString:values.checkBoxString
  
      })
      }
      else if(values.checkBoxString==null && values.radioButtonString){
        ref.firestore().collection("food").doc(food.id).update({
    
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price:values.food_price,
          food_category_id:category_name[0],
          food_category_name:category_name[1],
          radioButton:radioButton,
          checkBox:checkBox,
          radioButtonString:values.radioButtonString,
  
      })
          
      }
      else{
        ref.firestore().collection("food").doc(food.id).update({
    
          food_name: values.food_name,
          food_name_lower_case:foodnameLowerCase,
          food_description: values.food_description,
          food_price:values.food_price,
          food_category_id:category_name[0],
          food_category_name:category_name[1],
          radioButton:radioButton,
          checkBox:checkBox,
  
      })
      }
      formik.resetForm();
      setRadioButtonError(null);
      setCheckBoxError(null);
      handleClose()
    
    }


    // updateRef.update({
    //   complete: !order.complete,
    // });
  }
  console.log(food,"food")

  const formik = useFormik({
    initialValues: {
      food_name: food.food_name,
      food_description: food.food_description,
      food_price:food.food_price,
      food_category_id:food.food_category_id,
      radioButtonString:food.radioButtonString,
      checkBoxString:food.checkBoxString,
      
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
            setLoading(true);

      // const name = values.name
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleEdit(updatedOrders)
      handleUpdate(values);
      
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
        maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Food </DialogTitle>
          <DialogContent>
            <DialogContentText>please edit food</DialogContentText>

            <Grid container>
              <Grid item xs={12}>




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





                <Box m={2}>
                  <Typography align="left">name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_name"
                    required
                    autoComplete="off"
                    value={formik.values.food_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>

                {/* <Box m={2}>
                  <Typography align="left">Food Category name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_category_name"
                    value={formik.values.food_category_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box> */}

                <Box p={2}>
                  <Typography align="left">Description</Typography>
                  <TextField
                    id="outlined-basic"
                    name="food_description"
                    autoComplete="off"
                    value={formik.values.food_description}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">price</Typography>
                  <div style={{display:"flex"}}>

                  <TextField
                    id="outlined-basic"
                    name="food_price"
                    required
                    type="number"
                    autoComplete="off"
                    value={formik.values.food_price}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                   <Typography>
                    (Lowest price, then extra price will be added on to this)
                  </Typography>
                    </div>
                    <Typography align="left">Radio Buttons</Typography>
                  
                    <TextareaAutosize aria-label="minimum height" rowsMin={6} style={{ width: "100%" }} placeholder="radio buttons" name="radioButtonString" value={formik.values.radioButtonString} onChange={formik.handleChange} />
                    {radioButtonError && <Alert severity="error"> check the format again!</Alert>}     

                    <Typography align="left">check Boxes</Typography>

                    <TextareaAutosize aria-label="minimum height" rowsMin={6} placeholder="check Boxes" style={{ width: "100%" }} name="checkBoxString" value={formik.values.checkBoxString} onChange={formik.handleChange} />
                    {checkBoxError && <Alert severity="error"> check the format again!</Alert>} 
                 
                    {/* <Box p={2}>
                  <Typography align="left">Food Category</Typography>
                  <NativeSelect
                  name="food_category_id"
          id="demo-customized-select-native"
          style={{width:"100%"}}
          onChange={formik.handleChange}
          value={formik.values.food_category_id}
        >
          <option aria-label="None" value=""/>
          {foodCategoryArray.map((fcategory=>(
            <option value={fcategory.id}>{fcategory.category_name}</option>
          )))}
        </NativeSelect>
                </Box> */}
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
