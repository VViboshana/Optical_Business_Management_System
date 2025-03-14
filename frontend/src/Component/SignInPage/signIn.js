import React from 'react'
import './signIn.css'
import { FaUser, FaLock } from "react-icons/fa";
import Image from "../Image/image1.png";
import Icon from "../Image/google1.png";

const signIn = () => {
  return (
    <div>
    <div className="signin-content">
        {/* Left Side - Login Form */}
        <div className="signin-form-container">
          <h2>SIGN IN</h2>
          <form className="signin-form">
            <div className="input-box">
              <FaUser className="icon" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" />
            </div>
            <button type="submit" className="signin-submit">Login Now</button>
            <p className="forgot-password">Forgot password?</p>
            <button className="google-login">
              <img src={Icon} alt="Google" />
              Login with <b>google</b>
            </button>
          </form>
        </div>

        {/* Right Side - Image & Promo Text */}
        <div className="signin-image-container">
          <div className="promo-box">
            <h3>FIND YOUR <br /> BEST <br /> EYEWEAR</h3>
          </div>
          <img src={Image} alt="Eyewear Model" />
        </div>
      </div>
    </div>
  )
}

export default signIn