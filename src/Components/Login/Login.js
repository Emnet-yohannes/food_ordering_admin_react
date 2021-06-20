import React, { useState, useContext, useCallback } from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase/firebase";
import { AuthContext } from "../../Auth/Auth";
import LockIcon from "@material-ui/icons/Lock";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Image from "../../static/image/main.jpg"
import ref from '../../firebase/firebase'

const styles = {
  paperContainer: {
    height: 1353,
    backgroundImage: `url(${Image})`
  },
};
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        var adminExists = await (await app.firestore().collection("admin").where("email", "==", email.value).get()).size;
        if(adminExists==1){
          var user= await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          localStorage.setItem("uid", user.user.uid);
        history.push("/admin/dashboard");
        }else{
          alert("No user exists with this email");
        }
        
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  
  const paperStyle = {
    padding: 20,
    height: "700",
    width: 400,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Grid style={styles.paperContainer}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "darkblue", marginTop: "3%" }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h3" style={{ marginTop: "3%" }}>
            Food Delivery
          </Typography>
          <form onSubmit={handleLogin}>
            <Typography variant="h5" style={{ marginTop: "3%" }}>
              Email
            </Typography>
            {/* <input name="email" type="email" */}
            <TextField
              name="email"
              type="email"
              required
              className={styles.form_item}
              variant="outlined"
              style={{ width: "90%", marginTop: "1%" }}
            />
            <Typography variant="h5" style={{ marginTop: "3%" }}>
              Password
            </Typography>
            <TextField
              name="password"
              type="password"
              required
              variant="outlined"
              style={{ width: "90%", marginTop: "1%" }}
            />
            <Box style={{ marginTop: "3%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                    fullWidth
                  />
                }
                label="Remember me"
              />
            </Box>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ width: "90%", height: "4em", marginTop: "3%" }}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default withRouter(Login);
