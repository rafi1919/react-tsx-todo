import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Dashboard from './page/Dashboard'
import TopNavbar from './component/TopNavbar'
import AddData from './component/AddData'


const App = () => {

  return (
    <>
    <Router>
      <TopNavbar />
    <Routes>
      <Route path ="/" element={<Dashboard />} />
      <Route path ="/AddData" element={<AddData />} />
    </Routes>
     
    </Router>
    </>
  )
}

export default App
