import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Charts from "../components/Charts";
import TextBoxes from "../components/ExpensesTextBoxes";
import IncomeTextBoxes from "../components/IncomeTextBoxes";

const Home = () => {
  return (
    <div>
      <br />
      <div>
        <Typography color="primary" variant="h3" textAlign="center">
          Welcome to Expenses Manager
        </Typography>
        <br />
        <Typography color="primary" variant="h4" textAlign="center">
          add expense
        </Typography>
      </div>
      <br />
      <div>
        <TextBoxes />
      </div>

      <div>{/* <Charts /> */}</div>
      <Box marginTop="50px">
        <Typography color="primary" variant="h4" textAlign="center">
          add income
        </Typography>
        <br />
        <div>
          <IncomeTextBoxes />
        </div>
      </Box>
    </div>
  );
};

export default Home;
