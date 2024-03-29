import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FinancialState, CurrencySign } from "../types";

const BasicTable: React.FC<HomeTableProps> = ({ financialState }) => {
  const sums = new Map();
  Object.values(CurrencySign).map((sign) => {
    sums.set(sign, 0);
  });
  let i: number = 0;
  return (
    <div
      style={{
        width: "",
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "5%",
      }}
    >
      <TableContainer component={Paper} sx={{ backgroundColor: "#F0FFFF" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {Object.values(CurrencySign).map((sign) => {
                return (
                  <TableCell key={sign} style={{ textAlign: "center" }}>
                    {sign}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={"Income row"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Total Income</TableCell>
              {Object.values(CurrencySign).map((sign) => {
                let sum: number = 0;
                financialState.income.forEach((income) => {
                  let tmp: number = income.value;
                  if (income.currencySign === sign) sum = sum + tmp;
                });
                const current = sums.get(sign);
                sums.set(sign, current + sum);
                return (
                  <TableCell key={sign} style={{ textAlign: "center" }}>
                    {sum.toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow
              key={"expense row"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Total Expenses</TableCell>
              {Object.values(CurrencySign).map((sign) => {
                let sum = 0;
                financialState.expenses.forEach((expense) => {
                  if (expense.currencySign === sign) sum += expense.value;
                });
                const current = sums.get(sign);
                sums.set(sign, current - sum);
                return (
                  <TableCell key={sign} style={{ textAlign: "center" }}>
                    {sum.toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell>Total Blance</TableCell>
              {Object.values(CurrencySign).map((sign) => {
                let sum = sums.get(sign);

                return (
                  <TableCell key={sign} style={{ textAlign: "center" }}>
                    {sum.toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
interface HomeTableProps {
  financialState: FinancialState;
}

export default BasicTable;
