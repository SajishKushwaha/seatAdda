import React from 'react'

const HelpCard = ({image}) => {
  return (
    <div className=' items-center h-max p-3 '>
        <div className='mb-[1rem]'>
            <div className='mb-3'>
            <img className='w-full max-h-[300px]' src={image} alt="" /></div>
            <h1 className='text-2xl my-1 font-bold  font-serif' >Hi, User </h1>
            <h2 className='text-base font-sans'>I am here to help you with your travel related queries</h2></div>
        </div>
  )
}

export default HelpCard