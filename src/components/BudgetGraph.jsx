// import React from 'react'

import PieChart from "./PieChart";
import { ArcElement, Chart } from 'chart.js';
import UpdateBudget from './UpdateBudget'



export default function BudgetGraph({ budgetData, setBudgetData }) {

  // const [overallExpenses, setOveralExpenses] = React.useState(0)
  Chart.register(ArcElement)

  // function organiseExpenseData(expenses) {
    const organisedExpenseData = budgetData.expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.cost;
      return acc;
    }, {});
    // console.log(organisedExpenseData);
  //   return organiseExpenseData
  // }
  



  const data = {
    labels: ['Shopping', 'Groceries', 'Transport', 'Bills', 'Eating out', 'Holidays', 'Entertainment', 'Charity'],
    values: [300, 50, 100, 80, 150, 120, 60, 90]
  };


  return (
    <div className='flex flex-wrap items-center justify-center flex-col'>
      <h1>{budgetData.amount}</h1>
      <UpdateBudget
        budgetData={budgetData}
        setBudgetData={setBudgetData} />
      <PieChart data={data} />
    </div>
  )
}
