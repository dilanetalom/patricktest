import React from 'react'
import Layout from '../components/Layout'
import Allservice from '../components/Allservice'
import HeaderSlider from '../components/HeaderSlide'
import Howitworks from '../components/Howitworks'

function Porfolio() {
  return (
    <Layout>
      <HeaderSlider/>
      <Howitworks/>
      <Allservice/>
    </Layout>
  )
}

export default Porfolio