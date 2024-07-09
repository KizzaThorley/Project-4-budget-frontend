import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BudgetGraph from './BudgetGraph';
import ExpensesView from './ExpensesView';

export default function PastBudget() {
  const monthsArray = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let { budgetId } = useParams();
  const navigate = useNavigate();

  const [budgetData, setBudgetData] = React.useState({
    amount: '',
    id: '',
    month: '',
    year: '',
    expenses: [],
    owner: '',
  });

  const [allBudgets, setAllBudgets] = React.useState([]);

  async function getBudgets() {
    const token = localStorage.getItem('token');
    const allBudgetData = await axios.get('http://localhost:8000/api/budget/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAllBudgets(allBudgetData.data);

    const { data } = await axios.get(`http://localhost:8000/api/budget/${budgetId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBudgetData(data);
  }

  React.useEffect(() => {
    getBudgets();
  }, []);

  const filteredBudgets = allBudgets.filter(budget => !(budget.month === currentMonth && budget.year === currentYear));

  return (
    <div className='flex items-center flex-col min-h-screen bg-gray-100'>
      <h1 className='text-3xl'>Your Budget</h1>
      {budgetData && (
        <div>
          <BudgetGraph
            budgetData={budgetData}
            setBudgetData={setBudgetData}
          />
          <div className='w-4/5 mx-auto'>
            <ExpensesView
              budgetData={budgetData}
              setBudgetData={setBudgetData}
            />
          </div>
        </div>
      )}
      <div className='flex flex-wrap justify-center mt-4'>
        <div className='flex flex-col items-center mt-5'>
          <h2 className='text-2xl mb-2'>Other Budgets</h2>
          <div className='flex flex-wrap justify-center'>
            {filteredBudgets.length > 0 &&
              filteredBudgets.map((budget, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/single-budgets/${budget.id}`)}
                  className='bg-blue-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-blue-600 transition duration-200'
                >
                  View {monthsArray[budget.month - 1]} {budget.year}
                </button>
              ))
            }
            {filteredBudgets.every(budget => !(budget.month === currentMonth && budget.year === currentYear)) && (
              <button
                onClick={() => navigate(`/my-budget`)}
                className='bg-blue-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-blue-600 transition duration-200'
              >
                View Current Budget
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
