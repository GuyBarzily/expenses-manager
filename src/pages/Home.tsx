import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpensesTable from "../components/ExpensesTable";
import TextBoxes from "../components/ExpensesTextBoxes";
import HomeTables from "../components/HomeTables";
import IncomeTextBoxes from "../components/IncomeTextBoxes";
import { BaseFinancialState, FinancialItem } from "../types";

const Home = () => {
  const [financialState, setFinancialState] = useState(BaseFinancialState);
  const handleAddExpenses = (financialItem: FinancialItem) => {
    const newExpenses = [...financialState.expenses, financialItem];
    setFinancialState({
      ...financialState,
      expenses: newExpenses,
    });
  };
  const handleAddIncome = (financialItem: FinancialItem) => {
    const newIncome = [...financialState.income, financialItem];
    setFinancialState({
      ...financialState,
      income: newIncome,
    });
  };
  console.log(financialState.income);
  return (
    <Box>
      <div>
        <Typography
          //marginTop="20px"
          color="primary.black"
          variant="h3"
          textAlign="center"
          fontFamily={"Cursive"}
        >
          Welcome to Expenses Manager
        </Typography>
        <br />
        <Typography
          color="primary.black"
          variant="h4"
          textAlign="center"
          fontFamily={"Fantasy"}
        >
          add expense
        </Typography>
      </div>
      <br />
      <div>
        <TextBoxes handleSubmit={handleAddExpenses} />
      </div>
      <Box marginTop="50px">
        <Typography
          color="primary.black"
          variant="h4"
          textAlign="center"
          fontFamily={"Fantasy"}
        >
          add income
        </Typography>
        <br />
        <div>
          <IncomeTextBoxes handleSubmit={handleAddIncome} />
        </div>
        <div>
          <HomeTables financialState={financialState} />
        </div>
      </Box>
    </Box>
  );
};

export default Home;
