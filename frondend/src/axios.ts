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

export { signInAxios, signUpAxios, getAllFin, addIncomeAxios, addExpenseAxios };
