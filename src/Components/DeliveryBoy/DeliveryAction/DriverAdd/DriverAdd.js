
import { useState } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import {withRouter} from "react-router"
import React,{useCallback} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import ref from "../../../../firebase/firebase";
import 'firebase/firestore';

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  phone_number: Yup.string().matches(new RegExp('[0-9]{7}')),
  email: Yup.string().email().required("email is Required"),
  approve_status: Yup.string().required("approve status is required"),
  status: Yup.string().required(" status is required"),
  online_status: Yup.string().required("online status is required"),

});
const FormDialog = ({ driver,actionName ,history}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [email , setEmail] =useState("");
  const [password,setPassword] = useState("012345")

  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // ref.collection("orders").onSnapshot((querySnapshot) => {
  //   const items = [];
  //   querySnapshot.forEach((doc) => {
  //     items.push(doc.data());
  //   });
  //   setOrders(items);
  // });

//   const handleSignup = useCallback(async event=>{
//     event.preventDefault();
//     const email = values.email;
//     const password = "012345"
//     // const {email,password} =event.target.elements;
//     try{
//         await ref.auth().
//         createUserWithEmailAndPassword(email,password);
//         // history.push("/admin");
//     }catch(error){
//         alert(error)
//     }
// },[])

const handleSignup = async (values)=>{
  // event.preventDefault();
  // setPassword("012345");
  //console.log(email)
    return await ref.auth().
    createUserWithEmailAndPassword(values.email,"123456");
    // history.push("/admin/dashboard")
  
}



  const handleUpdate = async (values) => {
    
    // const updateRef = ref.collection("orders").child(order.id);
    // e.preventDefault()
    // setEmail(values.email);
    // await handleSignup(values);
    // //console.log((await handleSignup(values)).user.uid);
    try{
      var usercredentials = (await handleSignup(values));
      var userId = usercredentials.user.uid;

      ref.firestore().collection("drivers").doc(userId).set({
          name: values.name,
          last_name:values.last_name,
          phone_number: values.phone_number,
          email: values.email,
          approve_status:values.approve_status,
          online_status:values.online_status,
          status:values.status,
      });
    }catch(error){
      //console.log(error);
      alert(error);
    }
    
  
      // const {email,password} =event.target.elements;\
      
  
    // updateRef.update({
    //   complete: !order.complete,
    // });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      last_name:"",
      phone_number: "",
      email: "",
      status:"",
      online_status:"",
      approve_status:""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      // const name = values.name
      // const editedOrder = {values}
      // const updatedOrders = await handleUpdate()

      // handleEdit(updatedOrders)
      handleUpdate(values)
      // actions.setSubmitting(false);
      // actions.resetForm(formik.initialValues);
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
        startIcon={<EditIcon />}
        style={{ marginRight: "10px",backgroundColor:"darkgreen",color:"white" }}
      >
        Add DeliveryBoy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="md"
      >
        {
        ({ errors, touched }) =>
         <form onSubmit={formik.handleSubmit}>
    
          <DialogTitle id="form-dialog-title">{actionName}</DialogTitle>
          <DialogContent>
            <DialogContentText>Add DeliveryBoy</DialogContentText>

            <Grid container>
              <Grid item xs={5}>
                <Box p={2}>
                  <Typography align="left">name</Typography>
                  {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
                  <TextField
                    id="outlined-basic"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    required
                    autoComplete="off"
                    style={{ width: "100%" }}/>
                </Box>
                <Box p={2}>
                  <Typography align="left">Last Name</Typography>
                  <TextField
                    id="outlined-basic"
                    name="last_name"
                    required
                    autoComplete="off"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}/>
                </Box>
                <Box p={2}>
                  <Typography align="left">Phone</Typography>
                  <TextField
                    id="outlined-basic"
                    name="phone_number"
                    rrequired
                    autoComplete="off"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">Email</Typography>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    required
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>

                <Box p={2}>
                  <Typography align="left">Status</Typography>
                  <TextField
                    id="outlined-basic"
                    name="status"
                    required
                    autoComplete="off"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">Online Status</Typography>
                  <TextField
                    id="outlined-basic"
                    name="online_status"
                    required
                    autoComplete="off"
                    value={formik.values.online_status}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box p={2}>
                  <Typography align="left">approve_status</Typography>
                  <TextField
                    id="outlined-basic"
                    name="approve_status"
                    required
                    autoComplete="off"
                    value={formik.values.approve_status}
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
              Add
            </Button>
          </DialogActions>
        </form>
        }
      </Dialog>
    </div>
  );
}
export default withRouter(FormDialog  )