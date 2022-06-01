import { Typography } from "@mui/material";
import React from "react";
import Table from "../components/ExpensesTable";

const Expenses = () => {
  return (
    <div>
      <div>
        <Typography
          marginTop="50px"
          variant="h2"
          color="primary"
          textAlign="center"
        >
          Expenses
        </Typography>
      </div>
      <br />
      <div>
        <Table />
      </div>
    </div>
  );
};

export default Expenses;
