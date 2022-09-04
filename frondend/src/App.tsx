import React, { createContext, useContext, useEffect, useState } from "react";
import LayOutContainer from "./containers/LayOutContainer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppPages, IncomeData, LogInContext, SetLogInContext } from "./types";
import Expenses from "./pages/Expenses";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Income from "./pages/Income";
import {
  BaseFinancialState,
  FinancialItem,
  FinancialStateContext,
  SetFinancialStateContext,
} from "./types";
import Statistics from "./pages/Statistics";
import Admin from "./pages/Admin";
import Convert from "./pages/Convert";
import { getAllFin } from "./axios";

function App() {
  const [financialState, setFinancialState] = useState(BaseFinancialState);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  useEffect(() => {
    console.log("use Effect app");
    const user = window.localStorage.getItem("userData");
    if (user) {
      setLoggedIn(true);
      getFinancial();
    }
  }, []);
  const appendIncomes = (incomeData: object, expenseData: object) => {
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
    const res = await getAllFin();
    const income = res.data.income;
    const expense = res.data.expenses;
    appendIncomes(income, expense);
  }

  return (
    <>
      <Router>
        {!loggedIn && (
          <Routes>
            <Route
              path={AppPages.Home}
              element={
                <SignIn
                  handleLogIn={() => {
                    setLoggedIn(true);
                  }}
                />
              }
            />
            <Route
              path={AppPages.SignUp}
              element={
                <SignUp
                  handleSignUp={() => {
                    setSignedUp(true);
                  }}
                />
              }
            />
          </Routes>
        )}
        {loggedIn && (
          <FinancialStateContext.Provider value={financialState}>
            <SetFinancialStateContext.Provider value={setFinancialState}>
              <LayOutContainer>
                <Routes>
                  <Route path={AppPages.Home} element={<Home />} />
                  <Route path={AppPages.Expenses} element={<Expenses />} />
                  <Route path={AppPages.Income} element={<Income />} />
                  <Route path={AppPages.Statistics} element={<Statistics />} />
                  <Route path={AppPages.Admin} element={<Admin />} />
                  <Route path={AppPages.Convert} element={<Convert />} />
                  <Route
                    path={AppPages.SignUp}
                    element={
                      <SignUp
                        handleSignUp={() => {
                          setSignedUp(true);
                        }}
                      />
                    }
                  />
                </Routes>
              </LayOutContainer>
            </SetFinancialStateContext.Provider>
          </FinancialStateContext.Provider>
        )}
      </Router>
    </>
  );
}

export default App;
