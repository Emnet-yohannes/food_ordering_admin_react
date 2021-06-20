import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Button, Input, Typography } from "@material-ui/core";
import ref from "../../firebase/firebase";
import 'firebase/firestore';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import UserAction from './UserAction/UserAction'
import InputBase from "@material-ui/core/InputBase";
import AddUser from './UserAction/AddUser/AddUser'
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

export default function DataGridDemo({  }) {

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);


  const getValue = (params, name) => {
    return params.getValue(name);
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "first_name", headerName: "Name", width: 170 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "phone_number", headerName: "Phone Number", width: 170 },
    { field: "user_status", headerName: "Status", width: 170 },
    {
      field: "actions",
      headerName: "Action",
      width: 220,

      renderCell: (params) => (
        <UserAction
          user={{
            id: params.getValue("id"),
            user_name: params.getValue("first_name"),
            user_email: getValue(params, "email"),
            phone_number: getValue(params,"phone_number"),
            user_status: getValue(params,"user_status"),
          }}
          
        />
      ),
    }

  ];


  const getAlluser = () => {
    setLoading(true);
    ref.firestore().collection("users").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setUser(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAlluser()
  }, []);


  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">User</Typography>
      <Box textAlign="right" pb={2}>
      <AddUser />
      </Box>
      <DataGrid
        columns={columns}
        rows={user}
        pageSize={10}
        pagination {...user}
      ></DataGrid>
    </div>
  );
}
