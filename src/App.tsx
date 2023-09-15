import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
// import DashboardContainer from './componentcontain/DashboardFunction'
 import DashboardCont from './page/DashboardCont'
import TopNavbar from './component/TopNavbar'
import AddDataCont from './component/AddData/AddDataCont'


const App = () => {

  return (
    <>
    <Router>
      <TopNavbar />
    <Routes>

      {/* pecah per bagian */}
      <Route path ="/" element={<DashboardCont />} /> 

      {/* pecah function */}
      {/* <Route path ="/" element={<DashboardContainer />} /> */}
      <Route path ="/add-data" element={<AddDataCont />} />
    </Routes>
     
    </Router>
    </>
  )
}

export default App
