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

function App() {
  // const [count, setCount] = useState(0);
  // const [textValue, setTextValue] = useState("");
  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTextValue(event.target.value);
  // };
  return (
    <>
      <Router>
        <LayOutContainer>
          <Routes>
            <Route path={AppPages.Home} element={<Home />} />
            <Route path={AppPages.Expenses} element={<Expenses />} />
          </Routes>
        </LayOutContainer>
      </Router>
    </>
  );
}

export default App;
