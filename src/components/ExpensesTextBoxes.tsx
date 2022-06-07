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
import {
  BaseFinancialState,
  CurrencySign,
  ExpensesData,
  FinancialItem,
} from "../types";
import { ExpensType } from "../types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
        amountValue: parseInt(amountValue).toLocaleString(),
        expensTypeValue: expensTypeValue,
        currencyValue: currenciesValue,
      });

      handleSubmitProp({
        value: parseInt(amountValue),
        currencySign: currenciesValue as CurrencySign,
        descriptionValue: descriptionValue,
        type: expensTypeValue,
        date: dateValue,
      });
    } else {
      handleError();
    }

    console.log(BaseFinancialState);

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
          onChange={(e) => setDispriptionValue(e.target.value)}
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
          <FormHelperText>choose expens type</FormHelperText>
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
