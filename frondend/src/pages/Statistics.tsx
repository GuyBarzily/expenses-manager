import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
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
  Line,
  LineChart,
} from "recharts";
import { ExpensType, FinancialStateContext } from "../types";

const Statistics = () => {
  const financial = useContext(FinancialStateContext);
  const income = financial.income;
  const expense = financial.expenses;
  const exData = [
    { name: "Grocery", expense: 0 },
    { name: "Resturant", expense: 0 },
    { name: "Utilities", expense: 0 },
    { name: "Other", expense: 0 },
  ];

  const inData = [
    { name: "Salary", income: 0 },
    { name: "Rental", income: 0 },
  ];

  const expenseStatistics = () => {
    expense.forEach((e) => {
      const index = exData.findIndex((element) => element.name == e.type);
      if (index != -1) exData[index].expense += e.value;
    });
  };

  const incomeStatistics = () => {
    income.forEach((e) => {
      const index = inData.findIndex((element) => element.name == e.type);
      if (index != -1) inData[index].income += e.value;
    });
  };
  const margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
  };

  const divStyle = {
    display: "flex",
    // padding: "40px",
    alignItems: "center",
    justifyContent: "center",
    marginBotton: "20%",
  };

  const smallDiv = {
    padding: "40px",
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    expenseStatistics();
    incomeStatistics();
  }, []);

  return (
    <div>
      <div>
        <Typography
          marginTop="20px"
          marginLeft="10px"
          variant="h3"
          color="primary"
          textAlign="center"
          fontFamily="Helvetica Neue"
        >
          Statistitcs
        </Typography>
      </div>
      <div style={divStyle}>
        <div style={smallDiv}>
          <BarChart width={500} height={400} data={exData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="expense" fill="#82ca9d" />
          </BarChart>
        </div>
        <div style={smallDiv}>
          <BarChart width={350} height={400} data={inData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} fill="blue" />
            <Bar dataKey="income" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
      <div style={divStyle}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Statistics;
