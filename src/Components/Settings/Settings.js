import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { EditIcon } from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { Box, Button, Input, Typography } from "@material-ui/core";
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
import AddSetting from './SettingAction/AddSetting/AddSetting'
import SettingAction from './SettingAction/SettingAction'
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

  const [settings, setsettings] = useState([]);
  const [loading, setLoading] = useState(false);


  const getValue = (params, name) => {
    return params.getValue(name);
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "key", headerName: "key", width: 170 },
    { field: "value", headerName: "value", width: 170 },

    {
      field: "actions",
      headerName: "Action",
      width: 220,

      renderCell: (params) => (
        <SettingAction
        // actionName="deriver"
          setting={{
            id: params.getValue("id"),
            key: params.getValue("key"),
            value: getValue(params, "value"),
            
          }}
          
        />
      ),
    },
  ];



  const getAllSettings = () => {
    setLoading(true);
    ref.firestore().collection("settings").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      setsettings(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllSettings()
  }, []);

  // useEffect(() => {
  //   acceptedsettings();

  // }, [])

  //   const row = ''

  return (
    <div style={{ height: 550, width: "77vw" }}>
            

      <Typography variant="h4">Settings</Typography>
      <div style={{textAlign:"right",margin:"13px"}} pb={2}>
      <AddSetting />
      </div>
      {/* <Addsettings /> */}
      <DataGrid
        columns={columns}
        rows={settings}
        pageSize={10}
        pagination {...settings}
        // checkboxSelection
      ></DataGrid>
    </div>
  );
}
