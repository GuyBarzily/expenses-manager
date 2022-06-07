import { useState } from "react";

export enum AppPages {
    Home = "/",
    Expenses = "/exp",
    SignUp = "/signup",
    Income = "/income",
}

const IncomeData :Array <{
    "descriptionValue" : string,
    "dateValue" : string,
    "amountValue" : string,
    "incomeTypeValue" : string,
}> = [];
export {IncomeData}

const SignInData: Array<FormData> = [];
export {SignInData};

const SignUpData: Array<FormData> = [];
export {SignUpData};

const ExpensesData: Array<{
    "descriptionValue" :string,
    "dateValue" : string,
    "amountValue" :string,
    "expensTypeValue" :string
    "currencyValue" :string

}> = [];
export {ExpensesData};

export const BaseFinancialState: FinancialState = {
    income :[],
    expenses :[],
}

    // {
    //   value: 'USD',
    //   label: '$',
    //   income:0,
    //   expense:0
    // },
    // {
    //   value: 'EUR',
    //   label: '€',
    //   income:0,
    //   expense:0
    // },
    // {
    //   value: 'BTC',
    //   label: '฿',
    //   income:0,
    //   expense:0
    // },
    // {
    //   value: 'JPY',
    //   label: '¥',
    //   income:0,
    //   expense:0
    // },
    // {
    //     value: 'NIS',
    //     label: "₪",
    //     income:0,
    //   expense:0
    // }
//   ];

  export interface FinancialState {
      expenses: FinancialItem[],
      income: FinancialItem[],


  }
  export interface FinancialItem {
      currency?: Currency,
      currencySign: CurrencySign,
      value: number,
      descriptionValue: string,
      type: string,
      date: string,


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
        value: 'Grocery',
        label: 'Grocery'
    },

    {
        value: 'Resturant',
        label: 'Resturant'
    },

    {
        value: 'Utilities',
        label: 'Utilities'
    },

    {
        value : 'Other',
        label: 'Other'
    }
]

export {ExpensType}

const IncomeType = [
    {
        value: 'Salary',
        label: 'Salary'
    },
    {
        value: 'Rental',
        label: 'Rental'
    }
]
export {IncomeType}

