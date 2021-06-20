import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { EditIcon } from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { Box, Button, Divider, Input, Typography } from "@material-ui/core";
import OrderActions from "../Order/OrderActions/OrderActions";
import ref from "../../firebase/firebase";
import 'firebase/firestore';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import AddIcon from '@material-ui/icons/Add';
import InputBase from "@material-ui/core/InputBase";
import DriveAdd from './DeliveryAction/DriverAdd/DriverAdd'
import DriverActions from "./DeliveryAction/DriverAction";
import { DriveEtaRounded } from "@material-ui/icons";
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

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);


  const getValue = (params, name) => {
    return params.getValue(name);
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "last_name", headerName: "Last Name", width: 170 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },


    {
      field: "status",
      headerName: "Status",
      width: 80,
    },
    {
      field: "online_status",
      headerName: "Online Status",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 80,
      // valueGetter: (params) =>
      //   `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    {
        field: "approve_status",
        headerName: "Approve Status",
        width: 80,
      },

    {
      field: "actions",
      headerName: "Action",
      width: 220,

      renderCell: (params) => (
        <DriverActions
        actionName="deriver"
          driver={{
            id: params.getValue("id"),
            name: params.getValue("name"),
            last_name:params.getValue("last_name"),
            email: getValue(params, "email"),
            phone_number: getValue(params, "phone_number"),
            status: getValue(params, "status"),
            online_status: getValue(params, "online_status"),
            approve_status:getValue(params,"approve_status")
          }}
          
        />
      ),
    },
  ];

  // const ref = firebase.firestore().collection("drivers")
  // //console.log(ref);

  const getAlldrivers = () => {
    setLoading(true);
    ref.firestore().collection("drivers").onSnapshot((querySnapshot) => {
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
    getAlldrivers()
  }, []);

  // useEffect(() => {
  //   accepteddrivers();

  // }, [])

  //   const row = ''

  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">Delivery Boy</Typography>
      <Box textAlign="right" pb={2}>
      <DriveAdd />
      </Box>
      {/* <Adddrivers /> */}
      <DataGrid
        columns={columns}
        rows={drivers}
        pageSize={8}
        pagination {...drivers}
        // checkboxSelection
      ></DataGrid>
    </div>
  );
}
