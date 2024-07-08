import axios from 'axios'
import React from 'react'
import BudgetGraph from './BudgetGraph';
import Expense from './Expense'
import ExpensesView from './ExpensesView';

export default function Budget() {
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
        const { data } = await axios.get('http://localhost:8000/api/budget/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAllBudgets(data);

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        if (data && data.length > 0) {
            const foundData = data.find(budget => budget.month === currentMonth && budget.year === currentYear);

            if (foundData) {
                setBudgetData(foundData);
            } else {
                const newBudgetData = structuredClone(budgetData);
                newBudgetData.amount = 0;
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
            const newBudgetData = structuredClone(budgetData);
            newBudgetData.amount = 0;
            newBudgetData.month = currentMonth;
            newBudgetData.year = currentYear;
            const postResponse = await axios.post('http://localhost:8000/api/budget/', newBudgetData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBudgetData(postResponse.data);
            setAllBudgets([postResponse.data]);
        }
    }

    React.useEffect(() => {
        getBudgets();
    }, []);

    // console.log(allBudgets);

    return (
        <div className='flex flex-wrap items-center justify-center flex-col bg-gray-100'>
            <h1 className='text-3xl'>Your Budget</h1>
            {budgetData && (<div>

                <BudgetGraph
                    budgetData={budgetData}
                    setBudgetData={setBudgetData} />
                <ExpensesView
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                />
                <Expense
                    budgetId={budgetData.id}
                    setBudgetData={setBudgetData}
                />
            </div>
            )}

        </div>
    );
}