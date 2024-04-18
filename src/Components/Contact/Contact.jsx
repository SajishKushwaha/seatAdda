import React from 'react'
import Navbar from '../Navigation'
import FooterDesktop from '../FooterDesktop'
import ContactSection from './ContactSection'
import Footer from '../Footer'

const Contact = () => {
    return (
        <div>
            <Navbar />

            <div className='container mx-auto'>
                <ContactSection />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Contact