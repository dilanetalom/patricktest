import React from 'react'
import NavbarHeader from './Navbar'
import Footer from './Footer'
import {  Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';


function Layout({children}) {
  return (
    <div>
         {/* <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@righupweb.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+237 672 42 42 43</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>672 42 42 43</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <Facebook className="w-4 h-4 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="w-4 h-4 hover:text-pink-400 cursor-pointer transition-colors" />
                <Twitter className="w-4 h-4 hover:text-blue-300 cursor-pointer transition-colors" />
                <Linkedin className="w-4 h-4 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
              <div className="flex space-x-2">
                <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5 h-auto cursor-pointer hover:opacity-80" />
                <img src="https://flagcdn.com/w20/fr.png" alt="FR" className="w-5 h-auto cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <NavbarHeader />
      <div>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout