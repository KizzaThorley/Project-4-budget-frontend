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
    <div className='bg-gray-800'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://cdn.pixabay.com/photo/2016/09/26/22/45/pound-1697282_1280.png"
                alt="Your Company"
              />
            </div>

            <div className="flex space-x-4">

              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    SignUp
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link
                    to="/my-budget"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Your Budget
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
