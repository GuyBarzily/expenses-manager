import { Typography } from "@mui/material";
import ExpensesTable from "../components/ExpensesTable";

const Expenses = () => {
  return (
    <div>
      <div>
        <Typography
          marginTop="50px"
          variant="h2"
          color="primary"
          textAlign="center"
        >
          Expenses
        </Typography>
      </div>
      <br />
      <div>
        <ExpensesTable />
      </div>
    </div>
  );
};

export default Expenses;
