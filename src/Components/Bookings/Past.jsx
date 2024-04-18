import React from 'react'
import NoBookings from './NoBookings';

const Past = ({name}) => {
    const BOOKING_DATA = [
    
    ];
    return (
        <div className='my-3'>
            {BOOKING_DATA.length === 0 &&
                <NoBookings name={name}/>
            }
        </div>
    )
}

export default Past