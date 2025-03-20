import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'
const MyAppointments = () => {

  const {doctors}=useContext(AppContext)
  return (
    <div>
      <p>My Appointments</p>
      <div>
        {doctors.slice(0,2).map((item,index)=>(
          <div key={index}>
            <div>
              <img src={item.image} alt="" />
            </div>

            <div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
              <p>Address</p>
              <p>{item.address.line1}</p>
              <p>{item.address.line2}</p>
              <p><span>Date & Time:</span>25,July,2024 | 8:30 PM</p>
            </div>

            <div></div>

            <div className='flex flex-col gap-2 justify-end' >
              <button className='text-sm text-stone-500 text-corner sm:min-w-48 py-2 border rounded' >Pay online</button>
              <button className='text-sm text-stone-500 text-corner sm:min-w-48 py-2 border rounded' >cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
