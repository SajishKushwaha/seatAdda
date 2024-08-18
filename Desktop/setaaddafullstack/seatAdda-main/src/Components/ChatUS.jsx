import React from 'react'
import { BiSolidChat } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const ChatUs = () => {
    const navigate = useNavigate();
    return (
        <div className=''>
            {/* <button onClick={() => navigate('/help')} id="topButton" className="fixed bottom-16 sm:bottom-3 right-3 z-10  animate-bounce rounded-full bg-primarycolors-red w-16 h-16 sm:w-10 md:w-16  sm:h-10 md:h-16  justify-center items-center shadow-md">
                <div className='mx-auto '>
                    <BiSolidChat className='inline text-primarycolors-white text-3xl md:text-4xl ' /> </div>
            </button> */}
        </div>
    )
}

export default ChatUs