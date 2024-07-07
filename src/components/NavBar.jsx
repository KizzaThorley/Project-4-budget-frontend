import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {

  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token'))
  }, [location, setIsLoggedIn])

  function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }


  return (
    <div className='bg-gradient-to-r from-primary to-secondary shadow p-8 bg-gradient-to-t flex gap-10'>
      <Link to="/" className=''>Home</Link>
      {!isLoggedIn && <Link to="/login" className=''>Login</Link>}
      {!isLoggedIn && <Link to="/sign-up" className=''>SignUp</Link>}
      {isLoggedIn && <Link to="/my-budget" className=''>Your Budget</Link>}
      {isLoggedIn && <button onClick={logout}>Sign Out</button>}
    </div>
  )
}
