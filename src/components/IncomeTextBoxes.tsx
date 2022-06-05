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
import { useState } from "react";
import { CurrencySign, FinancialItem, IncomeData } from "../types";
import { IncomeType } from "../types";

const FormPropsTextFields: React.FC<IncomeTextBoxesProps> = ({
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

  // const formatAmount = (amount: string) => {
  //   var str = amount.split(".");
  //   str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   let cur: string = "";
  //   Currencies.forEach((currency) => {
  //     if (currency.value === currenciesValue) {
  //       cur = currency.label;
  //       currency.income += parseInt(amountValue);
  //       console.log(cur + currency.income);
  //     }
  //   });
  //   str.push("  " + cur);
  //   // console.log("cur" + Currencies.);
  //   console.log(str);
  //   return str.join("");
  // };

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
      IncomeData.push({
        descriptionValue: descriptionValue,
        dateValue: dateValue,
        amountValue: parseInt(amountValue).toLocaleString(),
        incomeTypeValue: expensTypeValue,
      });

      handleSubmitProp({
        value: parseInt(amountValue),
        currencySign: currenciesValue as CurrencySign,
      });
    } else {
      handleError();
    }
    console.log(IncomeData);
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
          <InputLabel id="income-type-input">Income Type</InputLabel>
          <Select
            error={error}
            labelId="income-type-select"
            id="income-type-select"
            value={expensTypeValue}
            label="Income Type"
            onChange={(e) => setExpenseTypeValue(e.target.value)}
          >
            {IncomeType.map((option) => (
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

interface IncomeTextBoxesProps {
  handleSubmit: (financialItem: FinancialItem) => void;
}
