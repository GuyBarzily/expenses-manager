import { Typography } from "@mui/material";
import { useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import { getUsers } from "../axios";

const Admin = () => {
  const dateData = [
    { name: "January", signedUp: 10 },
    { name: "February", signedUp: 0 },
    { name: "March", signedUp: 0 },
    { name: "April", signedUp: 0 },
    { name: "May", signedUp: 0 },
    { name: "June", signedUp: 0 },
    { name: "July", signedUp: 0 },
    { name: "August", signedUp: 0 },
    { name: "September", signedUp: 0 },
    { name: "October", signedUp: 16 },
    { name: "November", signedUp: 0 },
    { name: "December", signedUp: 0 },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getUsers();
    const users = res.data;
    for (let i = 0; i < users.length; i++) {
      const date = users[i].createdAt;
      const day = date.slice(date.lastIndexOf("-") + 1, date.indexOf("T"));
      console.log(day);
    }
    console.log(users);
  };

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
          Admin
        </Typography>
      </div>
      <div>
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
          <Line type="monotone" dataKey="signedUp" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="expense" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    </div>
  );
};

export default Admin;
