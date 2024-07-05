import React from 'react'

export default function Expense() {

    const [formData, setFormData] = React.useState({
        cost: '',
        budget: '',
        category: '',
        description: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    console.log(formData);
    const handleSelectChange = (e) => {
        const newFormData = structuredClone(formData)
        newFormData.category = e.target.value
        setFormData(newFormData)
      };

    return (
        <div>
            <div>
                <h1>Login</h1>
                <form>
                    <div>
                        <label>Cost</label>
                        <div>
                            <input
                                placeholder="10p"
                                type="text"
                                name={'cost'}
                                onChange={handleChange}
                                value={formData.cost}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Description</label>
                        <div>
                            <textarea
                                placeholder="..."
                                type="text"
                                name={'description'}
                                onChange={handleChange}
                                value={formData.description}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Choose a category:</label>
                        </div>
                        <select value={formData.category} onChange={handleSelectChange}>
                            <option value="">Select...</option>
                            <option value="Shopping" >Shopping</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Transport">Transport</option>
                            <option value="Bills">Bills</option>
                            <option value="Eating out">Eating out</option>
                            <option value="Holidays">Holidays</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Charity">Charity</option>
                            
                        </select>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
