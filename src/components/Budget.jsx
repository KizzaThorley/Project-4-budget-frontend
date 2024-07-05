import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Budget() {
    const [budgetData, setBudgetData] = useState({
        amount: '',
        id: '',
        month: '',
        year: '',
        expenses: [],
        owner: '',
    });

    const [allBudgets, setAllBudgets] = useState([]);

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
                const newBudgetData = {
                    ...budgetData,
                    amount: 0,
                    month: currentMonth,
                    year: currentYear
                };
                const postResponse = await axios.post('http://localhost:8000/api/budget/', newBudgetData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBudgetData(postResponse.data);
                data.push(postResponse.data)
                setAllBudgets(data);
            }
        } else {
            const newBudgetData = structuredClone(budgetData)
            newBudgetData.amount = 0
            const postResponse = await axios.post('http://localhost:8000/api/budget/', newBudgetData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBudgetData(postResponse.data);
            setAllBudgets([postResponse.data]);
        }
    }

    useEffect(() => {
        getBudgets();
    }, []);

    // console.log(allBudgets);

    return (
        <div className='flex flex-wrap items-center justify-center flex-col'>
            <h1 className='text-3xl'>Your Budget</h1>
            {budgetData && (
                <div>
                    <p>Amount: {budgetData.amount}</p>
                    <p>ID: {budgetData.id}</p>
                    <p>Month: {budgetData.month}</p>
                    <p>Year: {budgetData.year}</p>
                    <p>Owner: {budgetData.owner}</p>
                </div>
            )}
        </div>
    );
}