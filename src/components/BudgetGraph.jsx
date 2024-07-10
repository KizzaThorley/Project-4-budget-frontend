import React from 'react'
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import UpdateBudget from './UpdateBudget';
import { useLocation } from 'react-router-dom';

export default function BudgetGraph({ budgetData, setBudgetData }) {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

  const location = useLocation().pathname

  const [formData, setFormData] = React.useState('Pie');

  let organisedExpenseData = {};
  let chartData = [];
  let labelsArray = [];
  let dataArray = [];
  let spentBudget = budgetData.amount;
  let totalExpenses = 0;
  let remainingBudget = spentBudget;

  if (budgetData.expenses.length > 0) {
    organisedExpenseData = budgetData.expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.cost;
      return acc;
    }, {});

    chartData = Object.entries(organisedExpenseData).map(([category, cost]) => ({
      category,
      cost
    }));

    labelsArray = chartData.map(data => data.category);
    dataArray = chartData.map(data => data.cost);
    // totalExpenses = budgetData.expenses.reduce((acc, expense) => acc + expense.cost, 0);
    // remainingBudget = spentBudget - totalExpenses;
  }

  const data = {
    labels: labelsArray,
    datasets: [{
      data: dataArray,
      label: "Your Expenses",
      backgroundColor: [
        "#DC143C", "#00BFFF", "#32CD32", "#DAA520",
        "#9370DB", "#FF4500", "#00FFFF", "#FF69B4"
      ],
      hoverBackgroundColor:[
        "#DC143C", "#00BFFF", "#32CD32", "#DAA520",
        "#9370DB", "#FF4500", "#00FFFF", "#FF69B4"
      ],
      hoverOffset: 4
    }]
  };

  const options = {};

  const handleSelectChange = (e) => {
    setFormData(e.target.value);
  };
  

  return (
    <div className='w-full flex flex-col items-center mb-8'>
      <div className='text-lg mb-4'>Overall: £{budgetData.amount}</div>
      {budgetData.expenses.length > 0 && <div className='text-lg mb-4'>LeftOver: £{budgetData.savings}</div>}
      {!location.includes('/single-budget') &&
        <UpdateBudget
          budgetData={budgetData}
          setBudgetData={setBudgetData}
        />
      }
      {budgetData.expenses.length > 0 && (
        <div className='w-full max-w-md'>
          {formData === 'Pie' && <Pie data={data} options={options} />}
          {formData === 'Bar' && <Bar data={data} options={options} />}
          {formData === 'Doughnut' && <Doughnut data={data} options={options} />}
          <select
            className='w-full px-2 py-1 border rounded-lg text-sm focus:outline-none focus:border-blue-500 mt-2'
            value={formData}
            onChange={handleSelectChange}
            required
          >
            <option value="Pie">Pie Chart</option>
            <option value="Bar">Bar Graph</option>
            <option value="Doughnut">Doughnut Chart</option>
          </select>
        </div>
      )}
    </div>
  );
}