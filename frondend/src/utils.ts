import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { FinancialItem } from "./types";

const createFin = (data: any) => {
  const income: FinancialItem[] = [];
  for (let i = 0; i < data.length; i++) {
    const num: number = +data[i].amountValue.replaceAll(",", "");
    const tmp: FinancialItem = {
      descriptionValue: data[i].descriptionValue,
      date: data[i].dateValue,
      type: data[i].typeValue,
      value: num,
      currencySign: data[i].currencyValue,
      time: data[i].time,
    };
    income.push(tmp);
  }

  return income;
};

const formatAmount = (amount: string, currencySign: string) => {
  var str = amount.split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  str.push("      " + currencySign);
  return str.join("");
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const validateInput: Function = (
  descriptionValue: string,
  dateValue: string,
  amountValue: string,
  expensTypeValue: string,
  currenciesValue: string
) => {
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

export {
  createFin,
  formatAmount,
  StyledTableRow,
  StyledTableCell,
  validateInput,
};
