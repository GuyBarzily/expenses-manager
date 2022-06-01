import { useState } from "react";

export enum AppPages {
    Home = "/",
    Expenses = "/exp",
    SignUp = "/signup",


    
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

}> = [];
export {ExpensesData};

const Currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
    {
        value: 'NIS',
        label: "₪",
    }
  ];
export {Currencies};

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

