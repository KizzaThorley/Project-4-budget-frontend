import React from 'react'

export default function Login() {

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    console.log(formData);

    return (
        <div className='flex justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-5 h-fit'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
                <form>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="example@example.com"
                                type="text"
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700'>Password</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="Password"
                                type="password"
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>
                    </div>

                    <button className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>Submit</button>
                </form>
            </div>
        </div>
    )
}
