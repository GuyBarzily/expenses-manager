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

function App() {
  const [financialState, setFinancialState] = useState(BaseFinancialState);
  //const loggedIn = useContext(LogInContext)
  const [loggedIn, setLoggedIn] = useState(false);
  //const setLoggedIn = useContext(SetLogInContext)
  const [signedUp, setSignedUp] = useState(false);
  useEffect(() => {
    console.log("use Effect app");
    const user = window.localStorage.getItem("userData");
    console.log(user);
  });
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
