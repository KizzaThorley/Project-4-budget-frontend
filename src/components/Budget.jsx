import axios from 'axios'
import React from 'react'
import BudgetGraph from './BudgetGraph';
import Expense from './Expense'
import ExpensesView from './ExpensesView';
import DeleteBudget from './DeleteBudget'
import { useNavigate } from 'react-router-dom';

export default function Budget() {
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const budgetTemplate = {
        amount: 0,
        id: '',
        month: '',
        year: '',
        expenses: [],
        owner: '',
        savings: 0,
    }

    const navigate = useNavigate()
    const [budgetData, setBudgetData] = React.useState(false);

    const [allBudgets, setAllBudgets] = React.useState([]);

    async function getBudgets() {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:8000/api/budget/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data) {
                const foundData = data.find(budget => budget.month === currentMonth && budget.year === currentYear);
                if (foundData) {
                    setBudgetData(foundData);
                    setAllBudgets(data);

                } else {
                    const newBudgetData = structuredClone(budgetTemplate);
                    newBudgetData.month = currentMonth;
                    newBudgetData.year = currentYear;
                    const postResponse = await axios.post('http://localhost:8000/api/budget/', newBudgetData, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setBudgetData(postResponse.data);
                    data.push(postResponse.data)
                    setAllBudgets(data);


                }
            } else {
                const newBudgetData = structuredClone(budgetTemplate);
                newBudgetData.month = currentMonth;
                newBudgetData.year = currentYear;
                const postResponse = await axios.post('http://localhost:8000/api/budget/', newBudgetData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBudgetData(postResponse.data);
                setAllBudgets([postResponse.data]);

            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getBudgets();
        document.title = "Your Budget"
    }, []);

    const filteredBudgets = allBudgets && allBudgets.length > 0
        ? allBudgets.filter(budget => !(budget.month === currentMonth && budget.year === currentYear))
        : [];

    const lifetimeSavings = allBudgets.length > 1 ? allBudgets.reduce((acc, budget) => acc + budget.savings, 0) : false

    function getPayload() {
        const token = localStorage.getItem('token')
        const parts = token.split('.')
        return JSON.parse(atob(parts[1]))
    }



    function capitalizeFirstLetter(str) {
        if (str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const username = capitalizeFirstLetter(getPayload().username)
   

    return (
        budgetData ? (
            <div className='flex items-center flex-col min-h-screen bg-gray-100'>
                <h1 className='text-3xl mb-5'>{username} Budget's</h1>
                {lifetimeSavings && <h1>Your Lifetime Savings = {lifetimeSavings}</h1>}


                <div className='w-full lg:w-4/5 xl:w-4/5 flex flex-col items-center'>
                    <BudgetGraph
                        budgetData={budgetData}
                        setBudgetData={setBudgetData}
                    />

                    <div className='w-full lg:w-4/5 xl:w-4/5 mt-8'>
                        <ExpensesView
                            budgetData={budgetData}
                            setBudgetData={setBudgetData}
                        />
                    </div>

                    <Expense
                        budgetId={budgetData.id}
                        setBudgetData={setBudgetData}
                        budgetData={budgetData}
                    />
                </div>


                <div className='w-full lg:w-4/5 xl:w-4/5 flex flex-col items-center mt-8'>
                    <h2 className='text-2xl mb-2'>Past Budgets</h2>
                    <div className='flex flex-wrap justify-center'>
                        {filteredBudgets.length > 0 &&
                            filteredBudgets.map((budget, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate(`/single-budgets/${budget.id}`)}
                                    className='bg-blue-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-blue-600 transition duration-200'>
                                    View {monthsArray[budget.month - 1]} {budget.year}
                                </button>
                            ))
                        }
                    </div>
                </div>

                <DeleteBudget
                    budgetId={budgetData.id}
                    setBudgetData={setBudgetData}
                />

            </div>
        ) : (
            <h1>Loading...</h1>
        )
    );

} 
