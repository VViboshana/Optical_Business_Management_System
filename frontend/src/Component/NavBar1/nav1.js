import React from 'react'
import './nav.css';
import {Link} from 'react-router-dom';

const nav1 = () => {
  return (
    <div>
    <ul className='home-ul'>
            <li className='home-11'>
                <Link to="/home" className='active home-a'>
                <h1>Home</h1>
                </Link>
            </li>
            <li className='home-12'>
                <Link to="" className='active home-a'>
                <h1>About Us</h1>
                </Link>
            </li>
            <li className='home-12'>
                <Link to="" className='active home-a'>
                <h1>New Arivals</h1>
                </Link>
            </li>
            <li className='home-12'>
                <Link to="" className='active home-a'>
                <h1>Packagess</h1>
                </Link>
            </li>
            <li className='home-12'>
                <Link to="" className='active home-a'>
                <h1>Appointment</h1>
                </Link>
            </li>
            
            <li className='home-12'>
                <Link to="/signIn" className='active home-a'>
                <button>Sign In</button>
                </Link>
            </li>
            <li className='home-12'>
                <Link to="/signUp" className='active home-a'>
                <button>Get Start</button>
                </Link>
            </li>
            
            
        </ul>
    </div>
  )
}

export default nav1