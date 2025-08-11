import React from 'react'
import NavbarHeader from './Navbar'
import Footer from './Footer'
import {  Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';


function Layout({children}) {
  return (
    <div className='w-ful'>
      <NavbarHeader />
      <div>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout