import React from 'react'
import axios from 'axios';
import { baseUrl } from '../config';

export default function UpdateBudget({ budgetData, setBudgetData }) {




    const [viewBudget, setViewBudget] = React.useState(false)

    const [formData, setFormData] = React.useState({
        amount: budgetData.amount,
    })
    React.useEffect(() => {
        const initalForm = structuredClone(formData)
        initalForm.amount = budgetData.amount
        setFormData(initalForm)
    }, [budgetData.amount])
  
    function handleView() {
        if (!viewBudget) {
            setViewBudget(true)

        } else {
            setViewBudget(false)

        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            const updateBudgetData = structuredClone(budgetData)
            updateBudgetData.amount = Number(formData.amount)
            const newSavings = (Number(formData.amount) - budgetData.amount) + budgetData.savings
            updateBudgetData.savings = newSavings
            const { data } = await axios.put(`${baseUrl}/api/budget/${budgetData.id}/`, updateBudgetData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBudgetData(data)
            setViewBudget(false)


        } catch (error) {
            console.log(error);
        }
    }

   
    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    return (
        <div className='flex flex-wrap items-center justify-center mb-4'>
            {viewBudget ? (
                <div className='flex flex-col items-center'>
                    <form onSubmit={handleSubmit}>
                        <label className='block text-gray-700'>Amount</label>
                        <input
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                            placeholder="Budget"
                            type="text"
                            name='amount'
                            onChange={handleChange}
                            value={formData.amount}
                            required
                        />
                        <button className='text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105' style={{ width: '150px', height: '50px' }}>
                            Confirm Budget
                        </button>
                    </form>
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                    <button onClick={handleView} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Update Budget</button>
                </div>
            )}
        </div>
    )
}
