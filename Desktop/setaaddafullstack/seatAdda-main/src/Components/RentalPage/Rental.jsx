import React from 'react'
import Navbar from '../Navigation'
import ChatUs from '../ChatUS'
import HeroSection from './HeroSection'
import OffersSection from '../OffersSection'
import Footer from '../Footer'
import Details from './Details'
import AppBanner from '../AppBanner'

const Rental = () => {
    return (
        <div>
            <Navbar />
            <ChatUs />

            <HeroSection />
            <OffersSection />
            <Details />
            <AppBanner />
            <Footer />

        </div>
    )
}

export default Rental