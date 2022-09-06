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
import { createFin } from "./utils";
import { cp } from "fs";

function App() {
  const [financialState, setFinancialState] = useState(BaseFinancialState);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log("use Effect app");
    const user = window.localStorage.getItem("userData");
    if (user) {
      setLoggedIn(true);
      getFinancial();
    }
  }, [loggedIn]);

  async function getFinancial() {
    const res = await getAllFin();
    const incomeData = res.data.income;
    const expenseData = res.data.expenses;
    const income: FinancialItem[] = createFin(incomeData);
    const expense: FinancialItem[] = createFin(expenseData);
    if (!setFinancialState)
      throw new Error("setFinancialState was not initialized");
    setFinancialState({
      ...financialState,
      income: income,
      expenses: expense,
    });
  }

  return (
    <>
      <Router>
        <SetLogInContext.Provider value={setLoggedIn}>
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
                      console.log("handle sign up");
                      // setSignedUp(true);
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
                    <Route
                      path={AppPages.Statistics}
                      element={<Statistics />}
                    />
                    <Route path={AppPages.Admin} element={<Admin />} />
                    <Route path={AppPages.Convert} element={<Convert />} />
                    <Route
                      path={AppPages.SignUp}
                      element={
                        <SignUp
                          handleSignUp={() => {
                            console.log("handle sign up");

                            // setSignedUp(true);
                          }}
                        />
                      }
                    />
                  </Routes>
                </LayOutContainer>
              </SetFinancialStateContext.Provider>
            </FinancialStateContext.Provider>
          )}
        </SetLogInContext.Provider>
      </Router>
    </>
  );
}

export default App;
