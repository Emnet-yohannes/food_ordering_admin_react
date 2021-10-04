import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { EditIcon } from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { Box, Button, Input, Typography } from "@material-ui/core";
import OrderActions from "./OrderActions/OrderActions";
import ref from "../../firebase/firebase";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

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
  const [age, setAge] = React.useState("");
  const handleChange = ({ status }) => {
    // setAge(event.target.value);
    ref.firestore().collection("orders").doc(idGetter).update({
      order_status: status,
    });
  };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idGetter, setidGetter] = useState("");

  // const handleEdit = (updatedOrders) => {
  //   setOrders(updatedOrders)
  // }

  const getValue = (params, name) => {
    return params.getValue(name);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "order_for", headerName: "Customer Name", width: 170 },
    { field: "order_time", headerName: "Order Date Time", width: 190 },

    {
      field: "order_status",
      headerName: "Order Status",
      width: 150,
      renderCell: (params) => (
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          displayEmpty
          value={age}
          onChange={(event) =>
            ref.firestore()
              .collection("orders")
              .doc(params.getValue("id"))
              .update({
                order_status: event.target.value,
              })
          }
          
          input={<BootstrapInput />}
        >
          

          <MenuItem value={""}>{params.getValue("order_status")}</MenuItem>
          {/* <Box height="30px" border={1}></Box> */}
          {/* <MenuItem value=""></MenuItem> */}
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Accepted"}>Accepted</MenuItem>
          <MenuItem value={"Prepared"}>Prepared</MenuItem>
          <MenuItem value={"Delivered"}>Delivered</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </Select>
      ),
    },

    {
      field: "total_price",
      headerName: "Total",
      type: "number",
      width: 80,
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 150,
      // valueGetter: (params) =>
      //   `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },

    {
      field: "actions",
      headerName: "Action",
      width: 288,

      renderCell: (params) => (
        <OrderActions
          order={{
            id: params.getValue("id"),
            customer_name: params.getValue("order_for"),
            order_date: getValue(params, "order_time"),
            order_status: getValue(params, "order_status"),
            payment_status: getValue(params, "payment_status"),
            payment_method: getValue(params, "payment_method"),
            order_total: getValue(params, "total_price"),
            email: getValue(params, "order_for_email"),
            order_items:getValue(params,"order_items"),
            order_for_address:getValue(params,"order_for_address"),
            order_for_area:getValue(params,"order_for_area"),
            order_for_tel:getValue(params,"order_for_tel"),
            order_time:getValue(params,"order_time"),
          }}
        />
      ),
    },
  ];

  // const ref = firebase.firestore().collection("orders")
  // //console.log(ref);

  const getAllOrders = () => {
    setLoading(true);
    ref.firestore().collection("orders").where("order_status", "!=", "incart").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        
        items.push({ id: doc.id, ...doc.data() });
        // items.push(doc.data());
      });
      setOrders(items);
      // setLoading(false);
    });
  };
  function pendingOrders() {
    setLoading(true);
    ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        if (doc.data().order_status === "Pending") {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      setOrders(items);
      setLoading(false);
      //console.log("accepted Orders");
    });
  }


  function acceptedOrders() {
    setLoading(true);
    ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        if (doc.data().order_status === "Accepted") {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      setOrders(items);
      setLoading(false);
      //console.log("accepted Orders");
    });
  }
  function preparedOrders() {
    setLoading(true);
    ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        if (doc.data().order_status === "Prepared") {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      setOrders(items);
      setLoading(false);
      //console.log("prepared Orders");
    });
  }

  function deliveredOrders() {
    setLoading(true);
    ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        if (doc.data().order_status === "Delivered") {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      setOrders(items);
      setLoading(false);
      //console.log("Delivered Orders");
    });
  }

  function rejectedOrders() {
    setLoading(true);
    ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        if (doc.data().order_status === "Rejected") {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      setOrders(items);
      setLoading(false);
      //console.log("rejected Orders");
    });
  }

  useEffect(() => {
    if (orderPath === "allOrders") {
      getAllOrders();
    }
      else if (orderPath === "pendingOrders") {
        pendingOrders();
      
    } else if (orderPath === "acceptedOrders") {
      acceptedOrders();
    } else if (orderPath === "preparedOrders") {
      preparedOrders();
    } else if (orderPath === "deliveredOrders") {
      deliveredOrders();
    } else if (orderPath === "rejectedOrders") {
      rejectedOrders();
    }
  }, [orderPath]);

  // useEffect(() => {
  //   acceptedOrders();

  // }, [])

  //   const row = ''

  return (
    <div style={{ height: 600, width: "75vw" }}>
      <Typography variant="h4">Orders</Typography>
      {/* <AddOrders /> */}
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={8}
        // checkboxSelection
        showCellRightBorder={false}
        showColumnRightBorder={false}
        
      ></DataGrid>
    </div>
  );
}
