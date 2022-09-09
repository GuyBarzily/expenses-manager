import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FinancialStateContext, SetFinancialStateContext } from "../types";
import { styled } from "@mui/material/styles";
import { Box, Button, ButtonGroup, TableSortLabel } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteRow } from "../axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleDialog from "./DeleteDialog";

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

const formatAmount = (amount: string, currencySign: string) => {
  var str = amount.split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  str.push("      " + currencySign);
  return str.join("");
};

const CustomizedTables = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelected] = useState("No");
  const [removeId, setRemove] = useState(-1);
  const financialState = useContext(FinancialStateContext);
  const setFinanacial = useContext(SetFinancialStateContext);
  const ExpensesData = [...financialState.expenses];
  ExpensesData.sort((data1, data2) => {
    return data1.value - data2.value;
  });

  const handleClose = (value: string) => {
    console.log("close");
    setOpen(false);
    setSelected(value);
    console.log(removeId);
    if (value === "Yes") del(removeId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const del = (rowId: number) => {
    // event.preventDefault();
    const index = ExpensesData.findIndex((row) => {
      console.log(typeof row.time);
      const key = row.time;
      return key === rowId;
    });
    ExpensesData.splice(index, 1);
    if (!setFinanacial)
      throw new Error("setFinancialState was not initialized");
    setFinanacial({
      ...financialState,
      expenses: ExpensesData,
    });
    const res = deleteRow(rowId, "expenses");
  };
  return (
    <Box margin="100px">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel direction="asc">Description</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Expens Type</StyledTableCell>
              <StyledTableCell>Amount </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ExpensesData.map((row) => (
              <StyledTableRow key={row.time}>
                <StyledTableCell component="th" scope="row">
                  {row.descriptionValue}
                </StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell>{row.type}</StyledTableCell>
                <StyledTableCell>
                  {formatAmount(row.value.toString(), row.currencySign)}
                </StyledTableCell>
                <StyledTableCell>
                  <ButtonGroup
                    variant="text"
                    aria-label="outlined primary button group"
                    key={row.time}
                  >
                    {/* <Button>Edit</Button> */}
                    <Button
                      onClick={(e) => {
                        const key = row.time;
                        setRemove(key);
                        handleClickOpen();
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                  <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    selectedValue={selectedValue}
                  ></SimpleDialog>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default CustomizedTables;
