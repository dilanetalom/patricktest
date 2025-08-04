import React from 'react'
import AboutFirst from '../components/about/AboutFirst'
import Experience from '../components/about/Experience'
import Confiance from '../components/about/Confiance'
import Layout from '../components/Layout'

function Apropos() {
    return (
        <div>
           <Layout>
           <AboutFirst />
            <Experience />
            <Confiance />
           </Layout>
        </div>
    )
}

export default Apropos