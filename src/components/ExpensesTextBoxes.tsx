import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getEventListeners } from "events";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Currencies, ExpensesData } from "../types";
import { ExpensType } from "../types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function FormPropsTextFields() {
  const [descriptionValue, setDispriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [expensTypeValue, setExpenseTypeValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currenciesValue, setCurrenciesValue] = useState("");

  const handleError = () => {
    setError(!error);
  };

  const handleSuccess = () => {
    setSuccess(!success);
  };

  const formatAmount = (amount: string) => {
    var str = amount.split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let cur: string = "";
    Currencies.forEach((currency) => {
      if (currency.value === currenciesValue) cur = currency.label;
    });
    str.push("  " + cur);
    console.log(str);
    return str.join("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      descriptionValue !== "" &&
      dateValue !== "" &&
      amountValue !== "" &&
      expensTypeValue !== "" &&
      currenciesValue !== ""
    ) {
      // console.log(formatAmount(amountValue));
      handleSuccess();
      ExpensesData.push({
        descriptionValue: descriptionValue,
        dateValue: dateValue,
        amountValue: formatAmount(amountValue),
        expensTypeValue: expensTypeValue,
      });
    } else {
      handleError();
    }
    console.log(ExpensesData);
    setDispriptionValue("");
    setDateValue("");
    setAmountValue("");
    setExpenseTypeValue("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
    >
      <div>
        <Dialog open={error} onClose={handleError}>
          <Alert severity="error">Fill all boxes</Alert>
        </Dialog>
        <Dialog open={success} onClose={handleSuccess}>
          <Alert security="success">Expens added</Alert>
        </Dialog>
        <TextField
          onChange={(e) => setDispriptionValue(e.target.value)}
          required
          value={descriptionValue}
          id="discription-input"
          label="Description"
          name="descriptionValue"
        />
        <TextField
          onChange={(e) => setDateValue(e.target.value)}
          required
          value={dateValue}
          id="date-input"
          type="date"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="expens-type-input">Expense Type</InputLabel>
          <Select
            labelId="expens-type-select"
            id="expens-type-select"
            value={expensTypeValue}
            label="Expense Type"
            onChange={(e) => setExpenseTypeValue(e.target.value)}
          >
            {ExpensType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>choose expens type</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="currency-input">Currency</InputLabel>
          <Select
            labelId="currency-select"
            id="currency-select"
            value={currenciesValue}
            label="Currencies"
            onChange={(e) => setCurrenciesValue(e.target.value)}
          >
            {Currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>choose expens type</FormHelperText>
        </FormControl>
        <TextField
          required
          onChange={(e) => setAmountValue(e.target.value)}
          value={amountValue}
          id="amount"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
