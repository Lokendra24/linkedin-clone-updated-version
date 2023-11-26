import { CloseSharp } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import PostUpdate from "./PostUpdate";
import '../Css/Home.css'

function Home() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseSharp fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="home_container" >
      <PostUpdate />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You are Succesfull Login
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
