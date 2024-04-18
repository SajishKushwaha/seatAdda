import React from 'react'
import { NavLink } from "react-router-dom";
const BusServiceCard = ({ image, name }) => {
    return (
        <>
            <div className='bus-service-card p-3 hover:shadow-xl  hover:bg-primarycolors-textcolor/50'>
                <div>
                    <div className='  w-fit   mx-auto'>
                        <NavLink to="/">
                            <img className='bus-service-logo ' src={image} alt="" />

                            <div className='m-2'>
                                {name}
                            </div></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusServiceCard