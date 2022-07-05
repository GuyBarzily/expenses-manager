import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import FirstComponent from "./components/FirstComponent";
import LayOutContainer from "./containers/LayOutContainer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppPages, IncomeData } from "./types";
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

function App() {
  const [financialState, setFinancialState] = useState(BaseFinancialState);

  const [loggedIn, setLoggedIn] = useState(false);
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
            <Route path={AppPages.SignUp} element={<SignUp />} />
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
                  <Route path={AppPages.SignUp} element={<SignUp />} />
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
