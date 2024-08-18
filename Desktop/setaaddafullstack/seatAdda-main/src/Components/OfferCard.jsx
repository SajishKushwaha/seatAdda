import React from 'react'

const OfferCard = ({offer}) => {
  return (
    <div className='mx-auto  '>
        <img className='w-11/12 sm:w-full  ' src={offer.offer_img} alt="" />
    </div>
  )
}

export default OfferCard