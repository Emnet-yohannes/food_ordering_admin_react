import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button, Input, Typography } from "@material-ui/core";
import ref from "../../firebase/firebase";
import 'firebase/firestore';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FoodAction from './FoodAction/FoodAction'
import InputBase from "@material-ui/core/InputBase";
import AddFood from './FoodAction/AddFood/AddFood'
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "div-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function DataGridDemo({ orderPath }) {

  const [food, setfood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState('')




  // food_name: values.food_name,
  // food_description: values.food_description,
  // food_price: values.food_price,
  // food_category_id: category_name[0],
  // food_category_name:category_name[1],
  // radioButton,
  // checkBox,
  // keywords: values.keywords



  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "food_category_name", headerName: "Category Name", width: 170 },
    { field: "food_name", headerName: "Name", width: 170 },
    { field: "food_price", headerName: "Price", width: 170 },
    { field: "food_description", headerName: "Description", width: 170 },

    {
      field: "actions",
      headerName: "Action",
      width: 380,

      renderCell: (params) => (
        <FoodAction
          food={{
            id: params.getValue("id"),
            food_name: params.getValue("food_name"),
            food_category_name:params.getValue("food_category_name"),
            food_description: params.getValue("food_description"),
            food_price:params.getValue("food_price"),
            radioButton:params.getValue("radioButton"),
            checkBox:params.getValue("checkBox"),
            keywords:params.getValue("keywords"),
            checkBoxString:params.getValue("checkBoxString"),
            radioButtonString:params.getValue("radioButtonString")

          }}
          
        />
      ),

    },
  ]
  // const getAllfoodcat = (id) => {
  //   ref.firestore().collection("food_category").doc(id)
  // .get()
  // .then(function(doc) {
  //   if (doc.exists) {
  //     console.log("Document data:", doc.get("category_name"));
  //     setUserDetails(doc.get("category_name"))
  //     return userDetails
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });
  // };

  const getAllfood = () => {
    setLoading(true);
    ref.firestore().collection("food").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setfood(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllfood()
  }, []);

  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">Food</Typography>
      <Box textAlign="right" pb={2}>
      <AddFood />
      </Box>
      {/* <AddfoodCategories /> */}
      <DataGrid
        columns={columns}
        rows={food}
        pageSize={10}
        pagination {...food}
        // checkboxSelection
      >
      </DataGrid>
    </div>
  );
}
