import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='bg-gradient-to-r from-green-500 to-blue-700 shadow p-8 bg-gradient-to-t flex gap-10'>
      <Link to="/" className=''>Home</Link>
      <Link to="/login" className=''>Login</Link>
      <Link to="/sign-up" className=''>SignUp</Link>
    </div>
  )
}
