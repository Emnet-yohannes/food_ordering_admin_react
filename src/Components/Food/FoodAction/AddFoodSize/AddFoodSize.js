import React, {useState} from "react";
import { Container, Paper, Box,Grid,TextField,IconButton,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ref from "../../../../firebase/firebase"
const useStyles = makeStyles((theme) => ({

  inputGroup : {
    marginBottom: theme.spacing(1)
  }
}));

const App=({food})=> {
    const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const FoodSizeTemplate={size_name:"", size_price:""}
  const[FoodSizes,setFoodSizes]= useState([FoodSizeTemplate]); 
  const addFoodSize=()=>{
    setFoodSizes([...FoodSizes,FoodSizeTemplate])
  }

  const onChange= (e,index)=>{
    const  updatedFoodSizes = FoodSizes.map((FoodSize, i)=>index === i ?
     Object.assign(FoodSize,{[e.target.name]: e.target.value}) :FoodSize);
     setFoodSizes(updatedFoodSizes);
  };
  const removeFoodSize = (index)=>{
   const filterdFoodSizes = [...FoodSizes];
   console.log(filterdFoodSizes.length)


       filterdFoodSizes.splice(index, 1);
       setFoodSizes(filterdFoodSizes);
   
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit=()=>{
    ref.firestore().collection("food").doc(food.id).collection("sizes").add({
        FoodSizes
    });
    handleClose();
      console.log(FoodSizes);
  }
  return (
    <div className={classes.root}>
         <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        
        // startIcon={<AddIcon />}
        style={{ marginRight: "10px",backgroundColor:"darkGreen" ,color:"white",marginLeft:"3px"}}
      >
        Add Food Size
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
      
        {
          FoodSizes.map((FoodSize,index)=>(
          <Grid container spacing={2} key={index} className={classes.inputGroup} style={{padding:"10px"}}>
            <Grid item md={5}>
              <TextField 
              label="Size Name"
              placeholder="Enter size name"
              variant="outlined"
              required
              name="size_name"
              onChange={e=> onChange(e,index)}
              value={FoodSize.size_name}
              fullWidth 
  />
            </Grid>
            <Grid item md={5}>
              <TextField 
              label="price"
              placeholder="Enter price"
              variant="outlined"
              required
              name="size_price"
              onChange={e=> onChange(e,index)}
              value={FoodSize.size_price}
              fullWidth 
  />
            </Grid>
            {/* <Grid item md={2}>
              <TextField 
              label="Phone"
              placeholder="Enter Your Phone Number"
              variant="outlined"
              name="phone"
              onChange={e=> onChange(e,index)}
              value={FoodSize.phone}
              fullWidth 
  />
            </Grid>
            <Grid item md={3}>
              <TextField 
              label="Address"
              placeholder="Enter Your Full Address"
              variant="outlined"
              name="address"
              onChange={e=> onChange(e,index)}
              value={FoodSize.address}
              fullWidth 
  />
            </Grid> */}
            <Grid item md={1}>
              <IconButton color="secondary" onClick={()=> removeFoodSize(index)}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
                </IconButton> 
  
            </Grid>
            <Grid item md={1}>
            <IconButton variant="contained" color="primary" onClick={addFoodSize} >
                <AddIcon />
            </IconButton>

            </Grid>
          </Grid>))
        }
      

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;