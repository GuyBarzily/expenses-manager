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
import { CurrencySign, FinancialItem, IncomeData } from "../types";
import { IncomeType } from "../types";
import { addIncomeAxios } from "../axios";

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
  const valitateInput: Function = () => {
    if (
      descriptionValue === "" ||
      dateValue === "" ||
      amountValue === "" ||
      expensTypeValue === "" ||
      currenciesValue === ""
    )
      return false;

    let date: string[] = dateValue.split("-");
    let currentDate: Date = new Date();
    if (
      parseInt(date[0]) > currentDate.getFullYear() ||
      parseInt(date[0]) < 1900
    ) {
      return false;
    }

    return true;
  };

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
    if (valitateInput()) {
      handleSuccess();
      let a = localStorage.getItem("userData");
      const user = JSON.parse(a ?? "");
      IncomeData.push({
        userData: user.email,
        descriptionValue: descriptionValue,
        dateValue: dateValue,
        amountValue: parseInt(amountValue).toLocaleString(),
        typeValue: expensTypeValue,
        currencyValue: currenciesValue,
        time: time,
      });
      const current = IncomeData[IncomeData.length - 1];
      const res = await addIncomeAxios(current);

      handleSubmitProp({
        value: parseInt(amountValue),
        currencySign: currenciesValue as CurrencySign,
        descriptionValue: descriptionValue,
        type: expensTypeValue,
        date: dateValue,
        time: time,
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
          <FormHelperText>choose income type</FormHelperText>
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
          <Alert sx={{ width: 150 }} severity="error">
            incorrect input
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
