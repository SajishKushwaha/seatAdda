import React from 'react'
import Support from '../assets/Support.png';
import partner from "../assets/partner.png"
import discount from "../assets/Discount.png";
import register from "../assets/Register bus.png"
import route from "../assets/Route.png"


const ExtraService = () => {
  return (
    <div className="container mx-auto p-2 sm:p-5">
    <div className=' p-3 my-3 w-7/8 mx-auto '>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-0'>
            <div className='mx-auto'>
                <div className='mx-auto extraimg'><img className="" src={Support} alt="" /></div>
                <h2 className='text-2xl mx-auto text-primarycolors-black font-bold uppercase'>24x7</h2>
                <h5 className='text-l mx-auto text-primarycolors-textcolor uppercase'>Customer Support</h5>
            </div>
            <div className='mx-auto'>
                <div className='mx-auto extraimg'><img className="" src={route} alt="" /></div>
                <h2 className='text-2xl mx-auto text-primarycolors-black font-bold uppercase'>100+</h2>
                <h5 className='text-l mx-auto text-primarycolors-textcolor uppercase'>Routes</h5>
            </div>
            <div className='mx-auto'>
                <div className='mx-auto extraimg'><img className="rounded-full" src={discount} alt="" /></div>
                <h2 className='text-2xl mx-auto text-primarycolors-black font-bold uppercase'>Instant</h2>
                <h5 className='text-l mx-auto text-primarycolors-textcolor uppercase'>Discount</h5>
            </div>
            <div className='mx-auto'>
                <div className='mx-auto extraimg'><img className="rounded-full" src={register} alt="" /></div>
                <h2 className='text-2xl mx-auto text-primarycolors-black font-bold uppercase'>500+</h2>
                <h5 className='text-l mx-auto text-primarycolors-textcolor uppercase'>Bus Register</h5>
            </div>
            <div className='mx-auto'>
                <div className='mx-auto extraimg'><img className="rounded-full" src={partner} alt="" /></div>
                <h2 className='text-2xl mx-auto text-primarycolors-black font-bold uppercase'>50+ </h2>
                <h5 className='text-l mx-auto text-primarycolors-textcolor uppercase'>Bus Partners</h5>
            </div>

        </div>


    </div>
</div>
  )
}

export default ExtraService