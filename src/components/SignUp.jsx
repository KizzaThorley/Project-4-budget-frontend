import React from 'react'

export default function SignUp() {

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
    }, [])

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
console.log(formData);
    return (
        <div className='flex item-center justify-center'>
            <div className=''>
                <h1>Sign Up</h1>
                <form>
                    <div>
                        <label>Username</label>
                        <div>
                            <input
                                placeholder="Username"
                                type="text"
                                name={'username'}
                                onChange={handleChange}
                                value={formData.username}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>
                            <input
                                placeholder="example@example.com"
                                type="text"
                                name={'email'}
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label >Password</label>
                        <div>
                            <input
                                placeholder="Password"
                                type="password"
                                name={'password'}
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label >Password Confirmation</label>
                        <div>
                            <input
                                placeholder="Password Confirmation"
                                type="password"
                                name={'password_confirmation'}
                                onChange={handleChange}
                                value={formData.password_confirmation}
                                required
                            />
                            <div>
                                <label>First Name</label>
                                <div>
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        name={'first_name'}
                                        onChange={handleChange}
                                        value={formData.first_name}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <div>
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        name={'last_name'}
                                        onChange={handleChange}
                                        value={formData.last_name}
                                        required
                                    />
                                </div>
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
