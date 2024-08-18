import React from 'react'
import nobookings from '../../assets/error_trips.avif'
import NoBookings from './NoBookings';
const Cancelled = ({name}) => {
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

export default Cancelled