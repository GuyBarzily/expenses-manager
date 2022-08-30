import { Typography } from "@mui/material";
import React from "react";
import {
  PieChart,
  Pie,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Table from "../components/ExpensesTable";
import IncomeTable from "../components/IncomeTable";

const Statistics = () => {
  const data = [
    {
      name: "Page A",
      expense: 4000,
      income: 2400,
    },
    {
      name: "Page B",
      expense: 3000,
      income: 1398,
    },
    {
      name: "Page C",
      expense: 2000,
      income: 9800,
    },
    {
      name: "Page D",
      expense: 2780,
      income: 3908,
    },
    {
      name: "Page E",
      expense: 1890,
      income: 4800,
    },
    {
      name: "Page F",
      expense: 2390,
      income: 3800,
    },
    {
      name: "Page G",
      expense: 3490,
      income: 4300,
    },
  ];

  return (
    <div>
      <div>
        <Typography
          marginTop="50px"
          marginLeft="10px"
          variant="h2"
          color="primary"
          textAlign="center"
          fontFamily="Helvetica Neue"
        >
          Income Statistitcs
        </Typography>
      </div>
      <div>
        <BarChart width={1000} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#8884d8" />
          <Bar dataKey="income" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Statistics;
