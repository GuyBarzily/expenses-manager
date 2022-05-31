import { useState } from "react";

export enum AppPages {
    Home = "/",
    Expenses = "/exp",
    SignUp = "/signup",


    
}


const SignInData: Array<FormData> = [];
export {SignInData};

const SignUpData: Array<FormData> = [];
export {SignUpData};

const ExpensesData: Array<{
    "descriptionValue" :string,
    "dateValue" : string,
    "amountValue" :string,

}> = [];
export {ExpensesData};


