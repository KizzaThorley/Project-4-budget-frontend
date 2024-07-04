import React from 'react'

export default function Login() {
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
            
                    <button>Submit</button>
        </form>
    </div>
</div>
  )
}
