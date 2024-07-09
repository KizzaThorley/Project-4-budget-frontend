// import React from 'react'

import  { Pie }  from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import UpdateBudget from './UpdateBudget'




export default function BudgetGraph({ budgetData, setBudgetData }) {

  // const [overallExpenses, setOveralExpenses] = React.useState(0)
  ChartJS.register(ArcElement, Tooltip, Legend)

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
  const chartData = Object.entries(organisedExpenseData).map(([category, cost]) => ({
    category,
    cost
  }));

 
  
let labelsArray = [];
chartData.map(data => labelsArray.push(data.category));

let dataArray = [];
chartData.map(data => dataArray.push(data.cost));


let spentBudget = budgetData.amount;
let totalExpenses = budgetData.expenses.reduce((acc, expense) => acc + expense.cost, 0);
let remainingBudget = spentBudget - totalExpenses;



const data = {
  labels: labelsArray,
  label: "Your Expenses",
  datasets: [{
    data: dataArray,
    label: "Your Expenses",
    backgroundColor: [
      'red', 'blue', 'orange', 'green',
      'aqua', 'purple', 'yellow', 'gold'
    ],
    hoverBackgroundColor: [
      '#39FF14', '#39FF14', '#39FF14', '#39FF14',
      '#39FF14', '#39FF14', '#39FF14', '#39FF14'
    ],
    hoverOffset: 4
  }]
}


const options = {}


  return (
    <div className='w-full flex flex-col items-center'>
    <div className='flex flex-col items-center mb-5'>
        <h1>Overall: £{budgetData.amount}</h1>
        <h1>LeftOver: £{remainingBudget}</h1>
        <UpdateBudget
            budgetData={budgetData}
            setBudgetData={setBudgetData} />
        <Pie data={data} options={options} />
    </div>
    </div>
  )
}

