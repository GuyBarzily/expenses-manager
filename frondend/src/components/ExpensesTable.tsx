import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FinancialStateContext, SetFinancialStateContext } from "../types";

import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  TableSortLabel,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteRow } from "../axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleDialog from "./DeleteDialog";
import { formatAmount, StyledTableCell, StyledTableRow } from "../utils";

const CustomizedTables = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelected] = useState("No");
  const [removeId, setRemove] = useState(-1);
  const [loading, setLoading] = useState(false);
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
    if (value === "Yes") del(removeId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const del = async (rowId: number) => {
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
    setLoading(true);
    const res = await deleteRow(rowId, "expenses");
    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          alignSelf: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box margin="100px">
      <SimpleDialog
        open={open}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
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
