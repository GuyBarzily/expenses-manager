import React, { useState } from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import "./App.css";
import FirstComponent from "./components/FirstComponent";
import LayOutContainer from "./containers/LayOutContainer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppPages } from "./types";
import Expenses from "./pages/Expenses";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  // const [count, setCount] = useState(0);
  // const [textValue, setTextValue] = useState("");
  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTextValue(event.target.value);
  // };

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
          <LayOutContainer>
            <Routes>
              <Route path={AppPages.Home} element={<Home />} />
              <Route path={AppPages.Expenses} element={<Expenses />} />
              <Route path={AppPages.SignUp} element={<SignUp />} />
            </Routes>
          </LayOutContainer>
        )}
      </Router>
    </>
  );
}

export default App;
