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



  const columns = [
    { field: "id", headerName: "ID", width: 170 },
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
            food_description: params.getValue("food_description"),
            food_price:params.getValue("food_price")
          }}
          
        />
      ),
      // {
      //   field: "",
      //   headerName: "Order Status",
      //   width: 150,
      //   renderCell: (params) => (
      //     <Select
      //       labelId="demo-customized-select-label"
      //       id="demo-customized-select"
      //       displayEmpty
      //       value={age}
      //       onChange={(event) =>
      //         ref
      //           .collection("orders")
      //           .doc(params.getValue("id"))
      //           .update({
      //             order_status: event.target.value,
      //           })
      //       }
            
      //       input={<BootstrapInput />}
      //     >
            
      //       {setidGetter(params.getValue("id"))}
  
      //       <MenuItem value={""}>{params.getValue("order_status")}</MenuItem>
      //       <Box height="30px" border={1}></Box>
      //       <MenuItem value={"accepted"}>accepted</MenuItem>
      //       <MenuItem value={"prepared"}>prepared</MenuItem>
      //       <MenuItem value={"delivered"}>delivered</MenuItem>
      //       <MenuItem value={"rejected"}>rejected</MenuItem>
      //     </Select>
      //   ),
      // },
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

  // useEffect(() => {
  //   acceptedfoodCategories();

  // }, [])

  //   const row = ''

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
      ></DataGrid>
    </div>
  );
}
