import { TwoMpOutlined } from "@mui/icons-material";
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
// heezExpzNo6cb9H26aTrUtvr1A0n4VpT api key
const Statistics = () => {
  const financial = useContext(FinancialStateContext);
  // const [exData,setExData] = use
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

  const dateData = [
    { name: "January", income: 100, expense: 0 },
    { name: "February", income: 0, expense: 0 },
    { name: "March", income: 0, expense: 0 },
    { name: "April", income: 0, expense: 0 },
    { name: "May", income: 0, expense: 0 },
    { name: "June", income: 0, expense: 0 },
    { name: "July", income: 0, expense: 0 },
    { name: "August", income: 0, expense: 0 },
    { name: "September", income: 0, expense: 0 },
    { name: "October", income: 0, expense: 0 },
    { name: "November", income: 0, expense: 0 },
    { name: "December", income: 0, expense: 0 },
  ];

  const expenseStatistics = () => {
    expense.forEach((e) => {
      const index = exData.findIndex((element) => element.name == e.type);
      const date = e.date;
      const month = date.slice(date.indexOf("-") + 1, date.lastIndexOf("-"));
      const num = Number.parseInt(month);
      dateData[num - 1].expense += e.value;
      if (index != -1) exData[index].expense += e.value;
    });
  };

  const incomeStatistics = () => {
    income.forEach((e) => {
      const index = inData.findIndex((element) => element.name == e.type);
      const date = e.date;
      const month = date.slice(date.indexOf("-") + 1, date.lastIndexOf("-"));
      const num = Number.parseInt(month);
      dateData[num - 1].income += e.value;
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
  expenseStatistics();
  incomeStatistics();

  return (
    <div>
      <div>
        <Typography
          marginTop="10px"
          marginLeft="10px"
          variant="h4"
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
          width={1100}
          height={350}
          data={dateData}
          margin={{ top: 5, right: 30, left: 30, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#8884d8" />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Statistics;
