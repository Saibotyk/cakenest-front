import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ConnectPage from './pages/ConnectPage'
import OrderPage from './pages/OrderPage'
import ErrorPage from './pages/ErrorPage'
import { useState } from 'react'
import AdminContext from './context/AdminContext';




export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);

  const adminContextValue = {
    isAdmin,
    setIsAdmin,
    user,
    setUser
  }


  return (
    <AdminContext.Provider value={adminContextValue}>
      <Routes>
        <Route path="/" element={<ConnectPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AdminContext.Provider>
  )
}



