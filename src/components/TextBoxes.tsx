import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Dialog, Input, MenuItem } from "@mui/material";
import { getEventListeners } from "events";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { ExpensesData } from "../types";
import { ExpensType } from "../types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function FormPropsTextFields() {
  const [descriptionValue, setDispriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [expensTypeValue, setExpenseTypeValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleError = () => {
    setError(!error);
  };

  const handleSuccess = () => {
    setSuccess(!success);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      descriptionValue !== "" &&
      dateValue !== "" &&
      amountValue !== "" &&
      expensTypeValue !== ""
    ) {
      handleSuccess();
      ExpensesData.push({
        descriptionValue: descriptionValue,
        dateValue: dateValue,
        amountValue: amountValue,
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
        <TextField
          required
          id="expens-type-input"
          select
          label="Select"
          value={expensTypeValue}
          onChange={(e) => setExpenseTypeValue(e.target.value)}
          helperText="Please select expens type"
        >
          {ExpensType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          onChange={(e) => setAmountValue(e.target.value)}
          value={amountValue}
          id="amount"
          label="Amount"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
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
