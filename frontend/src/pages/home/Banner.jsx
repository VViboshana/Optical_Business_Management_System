import React from 'react'
import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>

<div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt=""></img>
        </div>

        <div className='md:w-1/2 w-full'>
            <h1 className='text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
            <p className='mb-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ex corrupti deserunt harum. Pariatur et, accusantium omnis tenetur quam, ipsam commodi ullam, fugit esse facilis asperiores amet officia distinctio eum.</p>
            <button className='btn-primary'>Subscribe</button>
        </div>
    </div>
  )
}

export default Banner