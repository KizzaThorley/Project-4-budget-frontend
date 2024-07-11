import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    // console.log(formData);

    React.useState(() => {
        document.title = "Sign-up"
        },[])

    async function onFormSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:8000/api/auth/register/', formData)
            toast(data.message)
            navigate('/login')
        } catch (error) {
            console.log(error.response.data.password_confirmation);
            if (error.response.data.username) {
                toast.error(error.response.data.username[0], {
                    autoClose: 3000,
                });
            } else if (error.response.data.email) {
                toast.error(error.response.data.email[0], {
                    autoClose: 3000,
                });
            } else if (error.response.data.password_confirmation) {
                toast.error(`Passwords ${error.response.data.password_confirmation[0]}`, {
                    autoClose: 3000,
                });
            } else {
                toast.error(error.response.data.message[0], {
                    autoClose: 3000,
                });
            }
        }
    }

    return (
        <div className='flex justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-5 h-fit'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Sign Up</h1>
                <form onSubmit={onFormSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Username</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="Username"
                                type="text"
                                name='username'
                                onChange={handleChange}
                                value={formData.username}
                                required
                            />
                        </div>
                    </div>
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
                    <div className='mb-4'>
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
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password Confirmation</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="Password Confirmation"
                                type="password"
                                name='password_confirmation'
                                onChange={handleChange}
                                value={formData.password_confirmation}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>First Name</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="First Name"
                                type="text"
                                name='first_name'
                                onChange={handleChange}
                                value={formData.first_name}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700'>Last Name</label>
                        <div>
                            <input
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                placeholder="Last Name"
                                type="text"
                                name='last_name'
                                onChange={handleChange}
                                value={formData.last_name}
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
