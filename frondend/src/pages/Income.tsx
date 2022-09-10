import { Typography } from "@mui/material";
import IncomeTable from "../components/IncomeTable";

const Income = () => {
  return (
    <div>
      <div>
        <Typography
          marginTop="50px"
          variant="h2"
          color="primary"
          textAlign="center"
          fontFamily="Helvetica Neue"
        >
          Income
        </Typography>
      </div>
      <br />
      <div>
        <IncomeTable />
      </div>
    </div>
  );
};

export default Income;
