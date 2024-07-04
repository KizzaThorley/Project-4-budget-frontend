import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Expense from './components/Expense'


export default function App() {
  return (<Router>
<NavBar />
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/sign-up" element={<SignUp/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/expense" element={<Expense/>} />
</Routes>

  </Router>
  )
}