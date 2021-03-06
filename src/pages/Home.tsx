import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import ExpensesTable from "../components/ExpensesTable";
import TextBoxes from "../components/ExpensesTextBoxes";
import HomeTables from "../components/HomeTables";
import IncomeTextBoxes from "../components/IncomeTextBoxes";
import {
  BaseFinancialState,
  FinancialItem,
  FinancialState,
  FinancialStateContext,
  SetFinancialStateContext,
} from "../types";

const Home = () => {
  // const [financialState, setFinancialState] = useState(BaseFinancialState);

  const financialState = useContext(FinancialStateContext);
  const setFinancialState = useContext(SetFinancialStateContext);

  const handleAddExpenses = (financialItem: FinancialItem) => {
    const newExpenses = [...financialState.expenses, financialItem];
    if (!setFinancialState)
      throw new Error("setFinancialState was not initialized");
    setFinancialState({
      ...financialState,
      expenses: newExpenses,
    });
  };
  const handleAddIncome = (financialItem: FinancialItem) => {
    const newIncome = [...financialState.income, financialItem];
    if (!setFinancialState)
      throw new Error("setFinancialState was not initialized");
    setFinancialState({
      ...financialState,
      income: newIncome,
    });
  };

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
          Welcome to your financial manager
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
