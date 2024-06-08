import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import { useEffect } from "react"
import { useTypeDispatch, useTypeSelector } from "./hooks/reduxHooks";
import { makeErrorDisable } from "./redux/reducers/userSlice";
import { getUser } from "./redux/actions/userActions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const { user, error } = useTypeSelector((state) => state.user)

  const dispatch = useTypeDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(getUser())
    }
  }, [])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable())
      }, 5000)
    }
  }, [error])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to={'/login'} />} />
          <Route path="/register" element={user ? <Navigate to={'/'} /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <Login />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
