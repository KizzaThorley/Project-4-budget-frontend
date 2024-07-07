// import React from 'react'

import PieChart from "./PieChart";
import { ArcElement, Chart} from 'chart.js';



export default function BudgetGraph({ budgetData }) {
    Chart.register(ArcElement)

    const data = {
        labels: ['Shopping', 'Groceries', 'Transport', 'Bills', 'Eating out', 'Holidays', 'Entertainment', 'Charity'],
        values: [300, 50, 100, 80, 150, 120, 60, 90]
      };


  return (
    <div className='flex flex-wrap items-center justify-center flex-col'>
      <h1>{budgetData.amount}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Update Budget</button>
      <PieChart data={data} />
    </div>
  )
}
