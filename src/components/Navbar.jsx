// src/components/Header.js
import React, { useState } from 'react';
import logo from "../images/patrick.jpeg"
import { Link } from 'react-router-dom';

// Assurez-vous que cette prop est passée depuis Layout.js
// activeSection sera la chaîne de caractères (ex: 'home', 'project', 'skills', 'contact')
function NavbarHeader({ activeSection, setActiveSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Ferme le menu après avoir cliqué sur un lien
  };

  // Helper pour générer les classes de liens conditionnelles
  const getNavLinkClasses = (sectionName) => {
    const baseClasses = "relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2";
    const activeClasses = "text-white font-bold border-b-2 border-white"; // Soulignement plus visible et texte blanc

    return `${baseClasses} ${activeSection === sectionName ? activeClasses : ''}`;
  };

  // Helper pour générer les classes de liens mobiles
  const getMobileNavLinkClasses = (sectionName) => {
    const baseClasses = "text-gray-200 hover:text-purple-400 transition duration-300 focus:outline-none py-2";
    const activeClasses = "text-white font-bold border-b-2 border-purple-500"; // Soulignement pour mobile aussi

    return `${baseClasses} ${activeSection === sectionName ? activeClasses : ''}`;
  };


  return (
    <header className="flex justify-between items-center  h-[12vh] w-full  text-gray-400 px-4 lg:px-[110px] fixed z-50 bg-white">
      {/* Logo avec l'effet abstrait (comme dans votre code) */}
      {/* <div className="text-3xl font-bold tracking-wider relative"> */}
        <span className="font-charismatic text-white w-[100px] h-full relative">
          <img src={logo} alt="" className='w-full h-full' />
        </span>
 

      {/* Liens de navigation pour desktop */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
      <Link className='relative text-blue-950 hover:text-white transition duration-300 focus:outline-none py-2 px-2' to="/" >Accueil</Link>
        <Link className='relative text-blue-950 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >A propos</Link>
        <Link className='relative text-blue-950 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >Services</Link>
        <Link className='relative text-blue-950 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >FAQ</Link>
        <Link className='relative text-blue-950 hover:text-white transition duration-300 focus:outline-none py-2 px-2' to="/contact">Contact</Link>
        {/* Si vous avez une section 'members', ajoutez-la ici */}
        {/* <button onClick={() => handleNavLinkClick('members')} className={getNavLinkClasses('members')}>Members</button> */}
      </nav>

      {/* Bouton CV pour desktop */}
      {/* <div className="hidden md:block">
        <button className="p-2 font-bold border-2 border-gray-600 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 hover:border-purple-500">
          Contact
        </button>
      </div> */}

      {/* Bouton Burger pour mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-950 focus:outline-none p-2 rounded-md hover:bg-blue-950 hover:text-white transition duration-200">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile (Overlay) */}
      <div
        className={`fixed inset-0 bg-blue-950 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-100 focus:outline-none p-2 rounded-md hover:bg-gray-800 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col text-lg items-center space-y-6  font-medium">
        <Link className='relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2' to="/" >Accueil</Link>
        <Link className='relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >A propos</Link>
        <Link className='relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >Services</Link>
        <Link className='relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2' >FAQ</Link>
        <Link className='relative text-gray-300 hover:text-white transition duration-300 focus:outline-none py-2 px-2' to="/contact">Contact</Link>
          {/* <button onClick={() => handleNavLinkClick('members')} className={getMobileNavLinkClasses('members')}>Members</button> */}
        </nav>

        {/* Bouton CV dans le menu mobile (optionnel) */}
        {/* <div className="mt-8">
          <button className="p-3 border-2 border-gray-600 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 hover:border-purple-500">
            CV
          </button>
        </div> */}
      </div>
    </header>
  );
}

export default NavbarHeader;