import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import TaskList from './pages/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfo } from './Redux/auth/authSlice';
function App() {

  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (token)
      dispatch(getUserInfo())
  }, [token, dispatch])
  return (

    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}></Route>
          <Route path='/tasks' element={<ProtectedRoute> <TaskList /> </ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
