import React from 'react'

export default function SignUp() {
  return (
    <div>
        <div>
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label>Username</label>
                    <div>
                        <input 
              placeholder="Username"
              type="text"
              name={'username'}
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
              name={'passwordConfirmation'}
              required
              />
                  <div>
                    <label>First Name</label>
                    <div>
                        <input 
              placeholder="example@example.com"
              type="text"
              name={'email'}
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
              required
              />
                    </div>
                </div>
                <div>
                    <label>First Name</label>
                    <div>
                        <input 
              placeholder="First Name"
              type="text"
              name={'first_name'}
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
