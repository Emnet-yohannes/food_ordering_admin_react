import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button, Input, Typography } from "@material-ui/core";
import ref from "../../firebase/firebase";
import 'firebase/firestore';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FoodCategoryAction from './FoodCategoryAction/FoodCategoryAction'
import InputBase from "@material-ui/core/InputBase";
import FoodCategoryAdd from './FoodCategoryAction/FoodCategoryAdd/FoodCategoryAdd'
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

  const [foodCategories, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);


  const getValue = (params, name) => {
    return params.getValue(name);
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "category_name", headerName: "Name", width: 170 },
    { field: "category_description", headerName: "Description", width: 170 },

    {
      field: "actions",
      headerName: "Action",
      width: 220,

      renderCell: (params) => (
        <FoodCategoryAction
          foodCategory={{
            id: params.getValue("id"),
            category_name: params.getValue("category_name"),
            category_description: getValue(params, "category_description"),
          }}
          
        />
      ),
    },
    // {
    //     field: "actions",
    //     headerName: "Action",
    //     width: 220,
  
    //     renderCell: (params) => (
    //       <DriverActions
    //         driver={{
    //           id: params.getValue("id"),
    //           customer_name: params.getValue("customer_name"),
    //           order_date: getValue(params, "order_date"),
    //           order_status: getValue(params, "order_status"),
    //           payment_status: getValue(params, "payment_status"),
    //           order_total: getValue(params, "order_total"),
    //         }}
    //       />
    //     ),
    //   },
  ];

  // const ref = firebase.firestore().collection("foodCategories")
  // //console.log(ref);

  const getAllfoodCategories = () => {
    setLoading(true);
    ref.firestore().collection("food_category").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setDrivers(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllfoodCategories()
  }, []);

  // useEffect(() => {
  //   acceptedfoodCategories();

  // }, [])

  //   const row = ''

  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">Food Category</Typography>
      <Box textAlign="right" pb={2}>
      <FoodCategoryAdd />
      </Box>
      {/* <AddfoodCategories /> */}
      <DataGrid
        columns={columns}
        rows={foodCategories}
        pageSize={10}
        pagination {...foodCategories}
        // checkboxSelection
      ></DataGrid>
    </div>
  );
}
