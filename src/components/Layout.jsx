import React from 'react'
import NavbarHeader from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div>
      <NavbarHeader />
      <div>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout