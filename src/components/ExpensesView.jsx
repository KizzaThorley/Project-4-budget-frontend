import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import EditExpense from './EditExpense'

export default function ExpensesView({ budgetData, setBudgetData }) {

    const [viewExpenses, setViewExpenses] = React.useState(false)

    function handleView() {
        if (!viewExpenses) {
            setViewExpenses(true)
        } else {
            setViewExpenses(false)
        }
    }

    const organisedExpenses = budgetData.expenses.reduce((expensesGroup, expense) => {
        if (!expensesGroup[expense.category]) {
            expensesGroup[expense.category] = [];
        }
        expensesGroup[expense.category].push(expense);
        return expensesGroup;
    }, {});
    // console.log(budgetData);
    // console.log(organisedExpenses);
    const arrayOfOrganisedExpenses = Object.entries(organisedExpenses).map(([category, expenses]) => ({
        category,
        expenses
    }));
    // console.log(arrayOfOrganisedExpenses);

    async function handleDelete(expenseId) {
        try {
            const token = localStorage.getItem('token')
            const deletedata = await axios.delete(`http://localhost:8000/api/expense/${expenseId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(deletedata);

            const { data } = await axios.get(`http://localhost:8000/api/budget/${budgetData.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBudgetData(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='flex flex-wrap items-center justify-center mb-4 w-full'>
            {viewExpenses ? (
                <div className='flex flex-col items-center w-full'>
                    <button onClick={handleView} className='mt-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 w-36 h-12'>
                        Hide Expenses
                    </button>
                    {arrayOfOrganisedExpenses.length > 0 ? (
                        <div className='flex flex-wrap gap-4 w-full justify-center'>
                            {arrayOfOrganisedExpenses.map((categoryExpenses, idx) => (
                                <div key={idx} className='flex flex-col items-center mb-5 w-full max-w-xs aspect-square'>
                                    <h1 className='text-xl mb-2'>{categoryExpenses.category}</h1>
                                    {categoryExpenses.expenses.map((expense, idx) => (
                                        <div key={idx} className='bg-white shadow-md rounded-lg p-4 mb-4 w-full'>
                                            <p><span className='font-bold'>Description:</span> {expense.description}</p>
                                            <p><span className='font-bold'>Cost:</span> {expense.cost}</p>
                                            <div className='flex justify-between mt-2 flex-col'>
                                                <button
                                                    className='bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-600 transition duration-200 mb-3'
                                                    onClick={() => handleDelete(expense.id)}>
                                                    Delete Expense
                                                </button>
                                                <EditExpense
                                                    expense={expense}
                                                    budgetId={budgetData.id}
                                                    setBudgetData={setBudgetData} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1 className='text-center'>You have no expenses yet</h1>
                    )}
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                    <button onClick={handleView} className='bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 w-36 h-12'>
                        View Expenses
                    </button>
                </div>
            )}
        </div>
    )
}
