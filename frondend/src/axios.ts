import axios from "axios";

const getAllFin: Function = async () => {
  const email = JSON.parse(window.localStorage.getItem("userData") ?? "");
  const res = await axios.post("http://localhost:8080/all-financial", email);
  return res;
};

const signInAxios: Function = async (user: object) => {
  const res = await axios.post("http://localhost:8080/sign-in", user);
  return res;
};

const signUpAxios: Function = async (user: object) => {
  const res = await axios.post("http://localhost:8080/user", user);
  return res;
};

const addIncomeAxios: Function = async (current: object) => {
  const res = await axios.post("http://localhost:8080/add-income", current);
  return res;
};

const addExpenseAxios: Function = async (current: object) => {
  const res = await axios.post("http://localhost:8080/add-expense", current);
};

const getUsers: Function = async () => {
  const res = await axios.get("http://localhost:8080/users");
  return res;
};

const deleteRow: Function = async (rowId: number, type: string) => {
  const email = JSON.parse(window.localStorage.getItem("userData") ?? "");
  const req = {
    email: email.email,
    rowId: rowId,
    type: type,
  };
  console.log("delete" + typeof req);
  const res = await axios.post("http://localhost:8080/delete", req);
  return res;
};

const getCurrencies: Function = async () => {
  console.log("getCuren axios");
  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/listquotes",
    headers: {
      "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };
  const res = await axios.request(options);
  return res.data;
};

const convert: Function = async (params: object) => {
  console.log("parms axios: " + params);
  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: params,
    headers: {
      "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const res = await axios.request(options);
  return res.data;
};

export {
  signInAxios,
  signUpAxios,
  getAllFin,
  addIncomeAxios,
  addExpenseAxios,
  getUsers,
  getCurrencies,
  convert,
  deleteRow,
};
