import React from 'react'

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
console.log(budgetData);
// console.log(organisedExpenses);
    const arrayOfOrganisedExpenses = Object.entries(organisedExpenses).map(([category, expenses]) => ({
        category,
        expenses
    }));
    console.log(arrayOfOrganisedExpenses);
    return (
        <div className='flex flex-wrap items-center justify-center mb-4'>
            {viewExpenses ? (
                <div className='flex flex-col items-center'>
                    {organisedExpenses ?
                        <div>
                            {arrayOfOrganisedExpenses && arrayOfOrganisedExpenses.map((expense, idx) => {
                                return <div key={idx}>
                                    <h1> hello</h1>
                                </div>
                            })}

                        </div>
                        : <h1>You have no expenses yet</h1>}
                    <button onClick={handleView} className='text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105' style={{ width: '150px', height: '50px' }}>
                        Hide Expenses
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                    <button onClick={handleView} className='bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105' style={{ width: '150px', height: '50px' }}>
                        View Expenses
                    </button>
                </div>
            )}
        </div>
    )
}
