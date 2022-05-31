import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@mui/material";
import { getEventListeners } from "events";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { ExpensesData } from "../types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function FormPropsTextFields() {
  const [descriptionValue, setDispriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(data.get("outlined-required"));

    ExpensesData.push({
      descriptionValue: descriptionValue,
      dateValue: dateValue,
      amountValue: amountValue,
    });
    console.log(ExpensesData);
    setDispriptionValue("");
    setDateValue("");
    setAmountValue("");
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
          onChange={(e) => setDispriptionValue(e.target.value)}
          required
          value={descriptionValue}
          id="outlined-required"
          label="Description"
          name="outlined-required"
        />
        <TextField
          onChange={(e) => setDateValue(e.target.value)}
          required
          value={dateValue}
          id="outlined-password-input"
          type="date"
        />
        <TextField
          onChange={(e) => setAmountValue(e.target.value)}
          required
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
        {/*<TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        /> */}
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
