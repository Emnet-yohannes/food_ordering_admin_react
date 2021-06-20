import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button, Input, Typography } from "@material-ui/core";
import ref from "../../../../firebase/firebase";
import ExtraAction from './ExtraAction/ExtraAction'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import 'firebase/firestore';
// import FoodAction from './FoodAction/FoodAction'
import InputBase from "@material-ui/core/InputBase";
import { useLocation, useParams } from "react-router";

import AddExtra from './ExtraAction/AddExtra/AddExtra'
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

export default function DataGridDemo({ food }) {

  const [extra, setextra] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const params = useParams()
  useEffect(() => {
   const path = location.pathname;
   //console.log("path is ", path);
   //console.log(params.id,' params')
  }, [])



  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "extra_name", headerName: "Name", width: 170 },
    { field: "extra_price", headerName: "Price", width: 170 },
    { field: "extra_description", headerName: "Description", width: 170 },

    {
      field: "actions",
      headerName: "Action",
      width: 330,

      renderCell: (params) => (
        <ExtraAction
          extra={{
            id: params.getValue("id"),
            extra_name: params.getValue("extra_name"),
            extra_description: params.getValue("extra_description"),
            extra_price:params.getValue("extra_price")
          }}
          
        />
      ),
    },
  ];

  const getAllextra = () => {
    setLoading(true);
    ref.firestore().collection("food").doc(params.id).collection("extras").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setextra(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllextra()
  }, []);

  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">Extra</Typography>
      <Box textAlign="right" pb={2}>
      </Box>
      <AddExtra extra={extra} />
      <DataGrid
        columns={columns}
        rows={extra}
        pageSize={10}
        pagination {...extra}
        // checkboxSelection
      ></DataGrid>
    </div>
  );
}
