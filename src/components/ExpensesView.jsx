import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import EditExpense from './EditExpense'
import { useLocation } from 'react-router-dom'
import { baseUrl } from '../config'

export default function ExpensesView({ budgetData, setBudgetData, }) {
    const location = useLocation().pathname

    const [viewExpenses, setViewExpenses] = React.useState(false)

    function handleView() {
        setViewExpenses(!viewExpenses)
    }

    const organisedExpenses = budgetData.expenses.reduce((expensesGroup, expense) => {
        if (!expensesGroup[expense.category]) {
            expensesGroup[expense.category] = [];
        }
        expensesGroup[expense.category].push(expense);
        return expensesGroup;
    }, {});
    

    const arrayOfOrganisedExpenses = Object.entries(organisedExpenses).map(([category, expenses]) => ({
        category,
        expenses
    }));

    async function handleDelete(expense) {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${baseUrl}/api/expense/${expense.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const updateSavingsOnBudget = structuredClone(budgetData)
            updateSavingsOnBudget.savings +=  expense.cost
            const { data } = await axios.put(`${baseUrl}/api/budget/${budgetData.id}/`, updateSavingsOnBudget, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBudgetData(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
            <div className='flex flex-col items-center mb-4 w-full'>
                {viewExpenses ? (
                    <div className='w-full lg:w-4/5 xl:w-4/5'>
                        <button onClick={handleView} className='mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-95 px-3 py-1 text-sm'>
                            Hide Expenses
                        </button>
                        {arrayOfOrganisedExpenses.length > 0 ? (
                            <div className='flex flex-wrap gap-4 justify-center'>
                                {arrayOfOrganisedExpenses.map((categoryExpenses, idx) => (
                                    <div key={idx} className='flex flex-col items-center mb-5 w-full max-w-xs'>
                                        <h1 className='text-lg mb-2'>{categoryExpenses.category}</h1>
                                        {categoryExpenses.expenses.map((expense, idx) => (
                                            <div key={idx} className='bg-white shadow-md rounded-lg p-2 mb-2 w-full'>
                                                <p className='text-sm'><span className='font-bold'>Description:</span> {expense.description}</p>
                                                <p className='text-sm'><span className='font-bold'>Cost:</span> {expense.cost}</p>
                                                <div className='flex justify-between mt-2'>
                                                    {!location.includes('/single-budget') && (
                                                        <div className='text-sm'>
                                                            <EditExpense
                                                                expense={expense}
                                                                budgetId={budgetData.id}
                                                                setBudgetData={setBudgetData}
                                                                budgetData={budgetData}
                                                            />
                                                            <button
                                                                className='bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-600 transition duration-200 mb-2 mr-2 text-xs'
                                                                onClick={() => handleDelete(expense)}>
                                                                Delete Expense
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1 className='text-lg text-center'>You have no expenses yet</h1>
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <button onClick={handleView} className='bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-95 px-3 py-1 text-sm'>
                            View Expenses
                        </button>
                    </div>
                )}
            </div>
    )
}
