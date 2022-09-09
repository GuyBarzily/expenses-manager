import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { convert, getCurrencies } from "../axios";

const Convert = () => {
  const array: string[] = [];
  const [currencies, setCurren] = useState(array);
  const [fromCurr, setFromCurr] = useState("");
  const [toCurr, setToCurr] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [display, setDispaly] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const con = {
      from: fromCurr,
      to: toCurr,
      amount: amountValue,
    };
    const ret = await convert(con);
    setLoading(true);
    setDispaly(ret.toLocaleString());
    setLoading(false);
  };
  const getCur = async () => {
    const curr: object = await getCurrencies();
    const arr: Array<string> = Object.keys(curr);

    setCurren(arr);
  };

  useEffect(() => {
    getCur();
  }, []);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography
        sx={{
          marginTop: "2%",
        }}
        //marginTop="20px"
        color="primary.black"
        variant="h3"
        textAlign="center"
        fontFamily={"Cursive"}
      >
        Currency Converter
      </Typography>
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
        marginTop="3%"
      >
        <TextField
          // error={error}
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="form curr">From</InputLabel>
          <Select
            id="fromCurr"
            value={fromCurr}
            label="fromCurr"
            onChange={(e) => setFromCurr(e.target.value)}
          >
            {currencies.length > 0 &&
              currencies.map((cur) => (
                <MenuItem value={cur} key={cur}>
                  {cur}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="to curr">To</InputLabel>
          <Select
            id="toCurr"
            value={toCurr}
            label="toCurr"
            onChange={(e) => setToCurr(e.target.value)}
          >
            {currencies.length > 0 &&
              currencies.map((cur) => (
                <MenuItem value={cur} key={cur}>
                  {cur}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Convert
          </Button>
        </div>
      </Box>
      <Typography align="center" variant="h3" fontFamily={"Cursive"}>
        {display}
      </Typography>
    </div>
  );
};
export default Convert;
