import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFileHandler, useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

// const isAdmin = true


const AdminLogin = () => {
  const secretKey = useInputValidation("");
  const dispatch = useDispatch()
  const {isAdmin} = useSelector((state)=>state.auth)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value))
  };

  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])

if(isAdmin) return <Navigate to='/admin/dashboard'/>

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(209 237 255), rgb(239 249 159))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1rem",
            marginTop: "0rem",
            //marginBottom:"15rem"
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "3rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              {" "}
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
