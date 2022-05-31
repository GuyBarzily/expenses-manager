import { TextField, Typography } from "@mui/material";
import React from "react";
import TextBoxes from "../components/TextBoxes";

const Home = () => {
  return (
    <div>
      <br />
      <div>
        <Typography color="primary" variant="h3" textAlign="center">
          Welcome to Expenses Manager
        </Typography>
        <br />
      </div>
      <br />
      <div>
        <TextBoxes />
      </div>
      {/* <SignIn /> */}
    </div>
  );
};

export default Home;
