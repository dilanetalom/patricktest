import React from 'react'
import Layout from '../components/Layout'
import Allservice from '../components/Allservice'
import HeaderSlider from '../components/HeaderSlide'
import Howitworks from '../components/Howitworks'
import TestimonialSection from '../components/TestimonialSection'
import PartnersSection from '../components/PartenaireSection'
import ContactForm from '../components/ContactForm'

function Porfolio() {
  return (
    <Layout>
      <HeaderSlider/>
      <Howitworks/>
      <Allservice/>
      <PartnersSection/>
      <TestimonialSection/>
      <ContactForm/>
    </Layout>
  )
}

export default Porfolio