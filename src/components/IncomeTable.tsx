import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IncomeData } from "../types";
import { styled } from "@mui/material/styles";
import { Box, TableSortLabel } from "@mui/material";
import { margin } from "@mui/system";
import { ArrowUpward } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  IncomeData.sort((data1, data2) => {
    return parseInt(data1.amountValue) - parseInt(data2.amountValue);
  });
  return (
    <Box margin="100px">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel direction="asc">Description</TableSortLabel>
                {/* Description */}
              </StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Income Type</StyledTableCell>
              <StyledTableCell>Amount $</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IncomeData.map((row) => (
              <StyledTableRow key={row.descriptionValue}>
                <StyledTableCell component="th" scope="row">
                  {row.descriptionValue}
                </StyledTableCell>
                <StyledTableCell>{row.dateValue}</StyledTableCell>
                <StyledTableCell>{row.incomeTypeValue}</StyledTableCell>
                <StyledTableCell>{row.amountValue}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
