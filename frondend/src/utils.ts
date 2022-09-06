import { useState } from "react";
import { FinancialItem } from "./types";

const createFin = (data: any) => {
  const income: FinancialItem[] = [];
  for (let i = 0; i < data.length; i++) {
    const num: number = +data[i].amountValue.replaceAll(",", "");
    const tmp: FinancialItem = {
      descriptionValue: data[i].descriptionValue,
      date: data[i].dateValue,
      type: data[i].typeValue,
      value: num,
      currencySign: data[i].currencyValue,
    };
    income.push(tmp);
  }

  return income;
};

export { createFin };
