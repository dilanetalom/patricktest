import React from 'react'
import ContactHero from '../components/ContactHero'
import ContactDetails from '../components/ContactDetails'
import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'

function Contact() {
    return (
        <div>
            <Layout>
                <ContactHero />
                <ContactDetails />
                <ContactForm />
            </Layout>
        </div>
    )
}

export default Contact