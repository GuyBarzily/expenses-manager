import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { CurrencySign, ExpensesData, FinancialItem } from "../types";
import { ExpensType } from "../types";
import { addExpenseAxios } from "../axios";
import { validateInput } from "../utils";

const FormPropsTextFields: React.FC<ExpenseTextBoxesProps> = ({
  handleSubmit: handleSubmitProp,
}) => {
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
    setError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const time = Date.now();
    event.preventDefault();
    if (
      validateInput(
        descriptionValue,
        dateValue,
        amountValue,
        expensTypeValue,
        currenciesValue
      )
    ) {
      handleSuccess();
      let a = localStorage.getItem("userData");
      const user = JSON.parse(a ?? "");
      ExpensesData.push({
        userData: user.email,
        descriptionValue: descriptionValue,
        dateValue: dateValue,
        amountValue: parseInt(amountValue).toLocaleString(),
        typeValue: expensTypeValue,
        currencyValue: currenciesValue,
        time: Number(time),
      });

      const current = ExpensesData[ExpensesData.length - 1];
      const res = await addExpenseAxios(current);

      handleSubmitProp({
        value: parseInt(amountValue),
        currencySign: currenciesValue as CurrencySign,
        descriptionValue: descriptionValue,
        type: expensTypeValue,
        date: dateValue,
        time: Number(time),
      });
    } else {
      handleError();
    }
    setDispriptionValue("");
    setDateValue("");
    setAmountValue("");
    setExpenseTypeValue("");
    setCurrenciesValue("");
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
        <TextField
          error={error}
          onChange={(e) => {
            setDispriptionValue(e.target.value);
          }}
          required
          value={descriptionValue}
          id="discription-input"
          label="Description"
          name="descriptionValue"
        />
        <TextField
          error={error}
          onChange={(e) => setDateValue(e.target.value)}
          required
          value={dateValue}
          id="date-input"
          type="date"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="expens-type-input">Expense Type</InputLabel>
          <Select
            error={error}
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
            error={error}
            labelId="currency-select"
            id="currency-select"
            value={currenciesValue}
            label="Currencies"
            onChange={(e) => setCurrenciesValue(e.target.value)}
          >
            {Object.values(CurrencySign).map((sign) => (
              <MenuItem key={sign} value={sign}>
                {sign}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>choose currency type</FormHelperText>
        </FormControl>
        <TextField
          error={error}
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
        {error && (
          <Alert sx={{ width: 120 }} severity="error">
            Fill all boxes
          </Alert>
        )}
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
};

export default FormPropsTextFields;

interface ExpenseTextBoxesProps {
  handleSubmit: (financialItem: FinancialItem) => void;
}
