import { useState, createContext } from "react";

export enum AppPages {
  Home = "/",
  Expenses = "/exp",
  SignUp = "/signup",
  Income = "/income",
  Statistics = "/statistics",
  Admin = "/admin",
  Convert = "/convert",
}

const IncomeData: Array<{
  userData?: string;
  descriptionValue: string;
  dateValue: string;
  amountValue: string;
  typeValue: string;
  currencyValue: string;
}> = [];
export { IncomeData };

const SignInData: Array<FormData> = [];
export { SignInData };

const SignUpData: Array<FormData> = [];
export { SignUpData };

const ExpensesData: Array<{
  userData?: string;
  descriptionValue: string;
  dateValue: string;
  amountValue: string;
  typeValue: string;
  currencyValue: string;
}> = [];
export { ExpensesData };

export const BaseFinancialState: FinancialState = {
  income: [],
  expenses: [],
};

export const FinancialStateContext = createContext(BaseFinancialState);

export const SetFinancialStateContext = createContext<React.Dispatch<
  React.SetStateAction<FinancialState>
> | null>(null);

export const LogInContext = createContext(false);

export const SetLogInContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

//export const SetLogInContext = createContext
export interface FinancialState {
  expenses: FinancialItem[];
  income: FinancialItem[];
}
export interface FinancialItem {
  // email:string,
  currency?: Currency;
  currencySign: CurrencySign;
  value: number;
  descriptionValue: string;
  type: string;
  date: string;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  BTC = "BTC",
  JPY = "JPY",
  NIS = "NIS",
}

export enum CurrencySign {
  USD = "$",
  EUR = "€",
  BTC = "฿",
  JPY = "¥",
  NIS = "₪",
}

const ExpensType = [
  {
    value: "Grocery",
    label: "Grocery",
  },

  {
    value: "Resturant",
    label: "Resturant",
  },

  {
    value: "Utilities",
    label: "Utilities",
  },

  {
    value: "Other",
    label: "Other",
  },
];

export { ExpensType };

const IncomeType = [
  {
    value: "Salary",
    label: "Salary",
  },
  {
    value: "Rental",
    label: "Rental",
  },
];
export { IncomeType };
