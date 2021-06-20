
import { useState } from "react";
import { TextField, Typography, Grid, Box, Container } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import ref from "../../../../firebase/firebase";
import 'firebase/firestore';
export default function FormDialog({ settings }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  //   //console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = Yup.object().shape({
    key: Yup.string().required("key is Required"),
    value: Yup.string().required("subject is Required"),

  });
  const handleUpdate = async (values) => {
    ref.firestore().collection("settings").doc(settings.id).update({
        key: values.key,
        value: values.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      key: settings.key,
      value: settings.value,
    },
    // validationSchema: schema,
    onSubmit: async (values) => {
      //console.log("hiiiiii");
      setLoading(true);
      handleUpdate(values)
      handleClose();
    },
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        color="primary"
        startIcon={<EditIcon />}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
  maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Edit Setting</DialogTitle>
          <DialogContent>
            <DialogContentText>please edit settings</DialogContentText>

            <Grid container>
              <Grid item xs={12}>
                <Box m={2}>
                  <Typography align="left">key</Typography>
                  <TextField
                    id="outlined-basic"
                    name="key"
                    required
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Box width={400}></Box>
                  </TextField>
                </Box>
                <Box p={2}>
                  <Typography align="left">value</Typography>
                  <TextField
                    id="outlined-basic"
                    name="value"
                    required
                    value={formik.values.value}
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
              edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
