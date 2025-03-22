//linara
import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import PatientDetailsForm from './pages/PatientDetailsForm'



const App = () => {

  return (
    <div className='mx-4 sm:mx-[10%]'>

      <Navbar />

      <Routes>
        <Route path = '/' element={<Home />} />
        <Route path = '/doctors' element={<Doctors />} />
        <Route path = '/patient-details' element={<PatientDetailsForm />} />
        <Route path="/doctors/:specialization?" element={<Doctors />} />
        <Route path = '/login' element={<Login />} />
        <Route path = '/my-profile' element={<MyProfile />} />
        <Route path = '/my-appointments' element={<MyAppointments />} />
        <Route path = '/appointment/:docId' element={<Appointment />} />
      </Routes>
      
    </div>
  )
}

export default App
