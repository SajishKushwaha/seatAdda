import React from 'react'
import Navbar from '../Navigation'
import FooterDesktop from '../FooterDesktop'
import PrivacySection from './PrivacySection'
import Footer from '../Footer'

const Privacy = () => {
  return (
    <div>
    <Navbar />

    <div className='container mx-auto'>
        <PrivacySection />
    </div>

    <div>
        <Footer />
    </div>
</div>
  )
}

export default Privacy