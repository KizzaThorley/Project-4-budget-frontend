import axios from 'axios';
// import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '../config';

export default function DeleteBudget({ budgetId, setBudgetData }) {
    const newBudgetData = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 0,
        savings: 0,
    }

    async function handleDelete() {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`${baseUrl}/api/budget/${budgetId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { data } = await axios.post(`${baseUrl}/api/budget/`, newBudgetData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            data.expenses = []
            setBudgetData(data);


            toast("Budget Reset")

        } catch (error) {
            console.log(error)
            toast(error.response.data.message)
        }
    }


    return (
            <div className='flex items-center justify-center mb-4 mt-4'>
                <div className='flex flex-col items-center'>
                    <button onClick={handleDelete} className='mt-4 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105 w-36 h-12'>
                        Reset Budget
                    </button>
                </div>
            </div>
        )
}
