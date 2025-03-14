import React from 'react'
import './home.css'
import NavBar1 from '../NavBar1/nav1';

const home = () => {
  return (
    
    <div>
        <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Clear Vision</div>
        <div className="navbar-container">
        <NavBar1/> {/* Include your existing navigation bar here */}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to Clear Vision</h1>
        <p>This is the home page.</p>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 YourCompany. All Rights Reserved.</p>
      </footer>
    </div>
    </div>
  )
}

export default home