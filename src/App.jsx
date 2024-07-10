import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Budget from './components/Budget'
import PastBudget from './components/PastBudget'



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'))

  return (<Router>
    <NavBar
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      pauseOnHover
      draggable={false}
      theme="dark"
      transition:Slide
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login
        setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/my-budget" element={<Budget />} />
      <Route path='/single-budgets/:budgetId' element={<PastBudget />} />
    </Routes>

  </Router>
  )
}