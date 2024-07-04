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
        <div>
            <div>
                <h1>Login</h1>
                <form>
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

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
