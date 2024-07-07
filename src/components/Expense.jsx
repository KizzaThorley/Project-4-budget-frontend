import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Expense({ budgetId}) {
    const initalForm = {
        cost: '',
        budget: '',
        category: '',
        description: '',
    }

    const [formData, setFormData] = React.useState(initalForm)

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    // console.log(formData);
    const handleSelectChange = (e) => {
        const newFormData = structuredClone(formData)
        newFormData.category = e.target.value
        setFormData(newFormData)
    };

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            const newFormData = structuredClone(formData)
            newFormData.cost = Number(newFormData.cost)
            newFormData.budget = budgetId
            const postResponse = await axios.post('http://localhost:8000/api/expense/', newFormData, {
                headers: { Authorization: `Bearer ${token}` }
            });
        toast("New Expense added");
        setFormData(initalForm)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.detail, {
                autoClose: 2500,
            })
        }
    }
    const [viewExpenseForm, setViewExpenseForm] = React.useState(false)

    function handleView() {
        if (!viewExpenseForm) {
            setViewExpenseForm(true)
    
        } else {
            setViewExpenseForm(false)
          
        }
    }


    return (
        <div className='flex flex-wrap items-center justify-center flex-col'>
        { viewExpenseForm ? 
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-5 h-fit'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Add An Expense</h1>
                <form onSubmit={onFormSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Cost in £</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="10"
                                type="text"
                                name='cost'
                                onChange={handleChange}
                                value={formData.cost}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Description</label>
                        <div>
                            <textarea
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="..."
                                type="text"
                                name='description'
                                onChange={handleChange}
                                value={formData.description}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700'>Choose a category:</label>
                        <select
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                            value={formData.category}
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Transport">Transport</option>
                            <option value="Bills">Bills</option>
                            <option value="Eating out">Eating out</option>
                            <option value="Holidays">Holidays</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Charity">Charity</option>
                        </select>
                    </div>
                    <button className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                        Submit
                    </button>
                </form>
                <button onClick={handleView} className='mt-5 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200'>
                        Hide Expense Form
                    </button>
            </div>
 : <button onClick={handleView} className='bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105' style={{ width: '150px', height: '50px' }}>
 Add Expense Form
</button>}
        </div>

    )
}
