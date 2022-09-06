import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { convert, getCurrencies } from "../axios";

const Convert = () => {
  const [age, setAge] = useState("");

  const [currencies, setCurren] = useState([]);
  const getCur = async () => {
    console.log("getCur");
    const curr = await getCurrencies();
    setCurren(curr);
    console.log("curr", curr);
    console.log("currencies ", currencies);
  };

  const getConvert = async () => {
    const parms = { from: "SGD", to: "MYR", q: "1.0" };
    const res = await convert(parms);
    console.log(res);
  };
  useEffect(() => {
    console.log("use effect convert");
    getCur();
  }, []);

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          //onChange={handleChange}
        >
          {currencies.length > 0 &&
            currencies.map((cur) => (
              <MenuItem value={cur} key={cur}>
                {cur}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default Convert;
