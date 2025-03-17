import React from 'react'
import './signUp.css'
import {Link} from 'react-router-dom';
import NavBar1 from '../NavBar1/nav1';

const signUp = () => {
  return (
    <div className="signup-container">
       <div className="navbar-container">
        <NavBar1/> {/* Include your existing navigation bar here */}
        </div>
      {/* Sign Up Form */}
      <div className="signup-form-container">
        <h2>SIGN UP</h2>
        <form className="signup-form">
          <input type="text" placeholder="Name" />
          <input type="password" placeholder="Password" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit" className="signup-submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/signIn">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default signUp