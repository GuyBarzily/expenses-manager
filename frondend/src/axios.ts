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
  const res = await axios.post("http://localhost:8080/delete", req);
  return res;
};

const getCurrencies: Function = async () => {
  const options = {
    method: "GET",
    // url: "https://currency-exchange.p.rapidapi.com/listquotes",
    url: "https://currency-converter-pro1.p.rapidapi.com/currencies",
    headers: {
      // "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      // "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };
  const res = await axios.request(options);
  return res.data.result;
};

const convert: Function = async (params: object) => {
  console.log("parms axios: " + params);
  const options = {
    method: "GET",
    // url: "https://currency-exchange.p.rapidapi.com/exchange",
    url: "https://currency-converter-pro1.p.rapidapi.com/convert",
    params: params,
    headers: {
      // "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      // "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      "X-RapidAPI-Key": "96902ee1d2msh3e472de85405f0bp15687ajsn2195466e9a06",
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };

  const res = await axios.request(options);
  console.log(res.data.result);
  return res.data.result;
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
