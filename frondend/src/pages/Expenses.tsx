import { Typography } from "@mui/material";
import React, { useContext } from "react";
import ExpensesTable from "../components/ExpensesTable";
import { FinancialStateContext } from "../types";

const Expenses = () => {
  const financialState = useContext(FinancialStateContext);
  console.log(financialState);
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
        <ExpensesTable />
      </div>
    </div>
  );
};

export default Expenses;
