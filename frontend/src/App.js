import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Component/HomePage/home';
import SignUp from './Component/SignUpPage/signUp';
import SignIn from './Component/SignInPage/signIn';

const App = () => {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signIn" element={<SignIn/>} />
        </Routes>
      </React.Fragment>
    </div>
  )
}

export default App