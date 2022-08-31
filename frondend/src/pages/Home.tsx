import { Box, Typography } from "@mui/material";
import { useEffect, useContext } from "react";
import TextBoxes from "../components/ExpensesTextBoxes";
import HomeTables from "../components/HomeTables";
import IncomeTextBoxes from "../components/IncomeTextBoxes";
import {
  FinancialItem,
  FinancialStateContext,
  SetFinancialStateContext,
} from "../types";
import { getAllFin } from "../axios";

const Home = () => {
  const financialState = useContext(FinancialStateContext);
  const setFinancialState = useContext(SetFinancialStateContext);
  useEffect(() => {
    console.log("use Effect");
    getFinancial();
  }, []);
  const appendIncomes = (incomeData: object, expenseData: object) => {
    // console.log(incomeData);
    // console.log(expenseData);
    const tmp = JSON.stringify(incomeData);
    const data = JSON.parse(tmp);
    const income: FinancialItem[] = [];
    for (let i = 0; i < data.length; i++) {
      const num: number = +data[i].amountValue.replaceAll(",", "");
      const tmp: FinancialItem = {
        descriptionValue: data[i].descriptionValue,
        date: data[i].dateValue,
        type: data[i].incomeTypeValue,
        value: num,
        currencySign: data[i].currencyValue,
      };
      income.push(tmp);
    }

    const tmp1 = JSON.stringify(expenseData);
    const data1 = JSON.parse(tmp1);
    const expense: FinancialItem[] = [];
    for (let i = 0; i < data1.length; i++) {
      const num: number = +data1[i].amountValue.replaceAll(",", "");
      const tmp: FinancialItem = {
        descriptionValue: data1[i].descriptionValue,
        date: data1[i].dateValue,
        type: data1[i].expensTypeValue,
        value: num,
        currencySign: data1[i].currencyValue,
      };
      expense.push(tmp);
    }
    if (!setFinancialState)
      throw new Error("setFinancialState was not initialized");
    setFinancialState({
      ...financialState,
      income: income,
      expenses: expense,
    });
  };

  async function getFinancial() {
    // console.log("inside get Financial");
    const res = await getAllFin();
    // console.log(res);
    const income = res.data.income;
    const expense = res.data.expenses;
    appendIncomes(income, expense);
    //  appendExpense(expense);
  }

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
