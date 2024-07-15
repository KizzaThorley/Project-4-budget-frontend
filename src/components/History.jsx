import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function History() {
  const [allBudgets, setAllBudgets] = React.useState([]);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${baseUrl}/api/budget/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllBudgets(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBudgets();
    document.title = 'History'
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Budget History</h1>
    {allBudgets.length > 0 ? (
      <div className="flex flex-wrap gap-4">
        {allBudgets.map((budget, index) => (
          <Link
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col mb-4"
            to={budget.month === currentMonth && budget.year === currentYear ? '/my-budget' : `/single-budgets/${budget.id}`}
          >
            <h2 className="text-lg font-semibold mb-2">{months[budget.month - 1]}</h2>
            <p><span className="font-semibold">Budget Amount:</span> £{budget.amount}</p>
            <p><span className="font-semibold">Savings:</span> £{budget.savings}</p>
          </Link>
        ))}
      </div>
    ) : (
      <>
        <p className="text-lg mb-5">No budget data available yet. Go to "My Budgets" to start your savings journey.</p>
        <Link
          className='bg-blue-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-blue-600 transition duration-200'
          to={'/my-budget'}
        >
          My Budget
        </Link>
      </>
    )}
  </div>
);
}


