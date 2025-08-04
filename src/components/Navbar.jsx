// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import logo from "../images/patrick.png"
import { Link } from 'react-router-dom';

function NavbarHeader({ activeSection, setActiveSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ name: 'Français', code: 'fr', flag: '�🇷' }); // Langue par défaut avec drapeau

  const servicesDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileServicesRef = useRef(null);
  const mobileLanguageRef = useRef(null);

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Ferme le menu mobile principal
    setIsMobileServicesOpen(false); // Ferme le menu déroulant des services mobile
    setIsMobileLanguageOpen(false); // Ferme le menu déroulant des langues mobile
  };

  // Ferme les menus déroulants de bureau lorsque l'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper pour générer les classes de liens conditionnelles (bureau)
  const getNavLinkClasses = (sectionName) => {
    const baseClasses = "relative text-blue-950 hover:text-blue-800 transition duration-300 focus:outline-none py-2 px-2";
    const activeClasses = "text-blue-800 font-bold border-b-2 border-blue-800";
    return `${baseClasses} ${activeSection === sectionName ? activeClasses : ''}`;
  };

  // Helper pour générer les classes de liens mobiles
  const getMobileNavLinkClasses = (sectionName) => {
    const baseClasses = "text-gray-200 hover:text-purple-400 transition duration-300 focus:outline-none py-2";
    const activeClasses = "text-white font-bold border-b-2 border-purple-500";
    return `${baseClasses} ${activeSection === sectionName ? activeClasses : ''}`;
  };

  // Liste des services pour le menu déroulant
  const services = [
    { name: "Développement web", path: "/services/developpement-web" },
    { name: "Création d'entreprise", path: "/services/creation-entreprise" },
    { name: "SEA & SEO", path: "/services/sea-seo" },
    { name: "Infogérance", path: "/services/infogerance" },
    { name: "Applications mobiles", path: "/services/applications-mobiles" },
    { name: "Graphic Design", path: "/services/graphic-design" },
    { name: "Social Media Management", path: "/services/social-media-management" },
    { name: "Digital Management", path: "/services/digital-management" },
    { name: "Maintenance Informatique", path: "/services/maintenance-informatique" },
    { name: "Cybersécurité", path: "/services/cybersecurite" },
    { name: "Réseaux", path: "/services/reseaux" },
  ];

  // Liste des langues avec drapeaux
  const languages = [
    { name: "Français", code: "fr", flag: '🇫🇷' },
    { name: "English", code: "en", flag: '🇬🇧' },
  ];

  return (
    <header className="flex justify-between items-center h-[12vh] w-full text-gray-400 px-4 lg:px-[110px] fixed z-50 bg-white shadow-md">
      {/* Logo */}
      <span className="font-charismatic text-white w-[100px] h-full relative">
        <img src={logo} alt="Logo" className='w-full h-full object-contain' />
      </span>

      {/* Liens de navigation pour bureau */}
      <nav className="hidden md:flex flex-grow justify-center items-center gap-3 text-lg font-medium">
        <Link className={getNavLinkClasses('home')} to="/" onClick={() => handleNavLinkClick('home')}>Accueil</Link>
        <Link className={getNavLinkClasses('about')} to="/about" onClick={() => handleNavLinkClick('about')}>A propos</Link>

        {/* Menu déroulant Services pour bureau */}
        <div
          className="relative" // Removed 'group' class
          ref={servicesDropdownRef}
        >
          <button
            className="relative text-blue-950 hover:text-blue-800 transition duration-300 focus:outline-none py-2 px-2 flex items-center"
            onClick={() => setIsServicesDropdownOpen((prevState) => !prevState)}
          >
            Services
            <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isServicesDropdownOpen && (
            <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  className="block px-4 py-2 text-blue-950 hover:bg-blue-50 hover:text-blue-800 transition duration-200"
                  onClick={() => {
                    setIsServicesDropdownOpen(false);
                    handleNavLinkClick('services');
                  }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link className={getNavLinkClasses('realisations')} to="/realisations" onClick={() => handleNavLinkClick('realisations')}>Nos Réalisations</Link>
        <Link className={getNavLinkClasses('faq')} to="/faq" onClick={() => handleNavLinkClick('faq')}>FAQ</Link>
        <Link className={getNavLinkClasses('shop')} to="/shop" onClick={() => handleNavLinkClick('shop')}>Boutique</Link>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <Link className="px-6 py-3 font-bold bg-[#c22d0b] text-white rounded-2xl hover:bg-blue-950 transition duration-300" to="/contact" onClick={() => handleNavLinkClick('contact')}>
          Contact
        </Link>

        <div className="relative" ref={languageDropdownRef}>
          <button
            className="relative text-blue-950 hover:text-blue-800 transition duration-300 focus:outline-none py-2 px-2 flex items-center"
            onClick={() => setIsLanguageDropdownOpen((prevState) => !prevState)}
          >
            {currentLanguage.flag} {/* Emoji du drapeau */}
            <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-20 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="block w-full text-center px-4 py-2 text-blue-950 hover:bg-blue-50 hover:text-blue-800 transition duration-200 text-2xl"
                  onClick={() => {
                    setCurrentLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                  }}
                >
                  {lang.flag} {/* Emoji du drapeau */}
                </button>
              ))}
            </div>
          )}
        </div>



      </div>

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

      {/* Menu Mobile (Superposition) */}
      <div
        className={`fixed inset-0 bg-blue-950 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-100 focus:outline-none p-2 rounded-md hover:bg-gray-800 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col text-lg items-center space-y-4 font-medium w-full">
          <Link className={getMobileNavLinkClasses('home')} to="/" onClick={() => handleNavLinkClick('home')}>Accueil</Link>
          <Link className={getMobileNavLinkClasses('about')} to="/about" onClick={() => handleNavLinkClick('about')}>A propos</Link>

          {/* Menu déroulant Services pour mobile */}
          <div className="w-full text-center" ref={mobileServicesRef}>
            <button
              onClick={() => setIsMobileServicesOpen((prevState) => !prevState)}
              className="relative text-white hover:text-purple-400 transition duration-300 focus:outline-none py-2 px-2 flex items-center justify-center w-full"
            >
              Services
              <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isMobileServicesOpen && (
              <div className="flex flex-col items-center space-y-2 mt-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="text-gray-200 hover:text-purple-400 transition duration-300 focus:outline-none py-1"
                    onClick={() => handleNavLinkClick('services')}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link className={getMobileNavLinkClasses('realisations')} to="/realisations" onClick={() => handleNavLinkClick('realisations')}>Nos Réalisations</Link>
          <Link className={getMobileNavLinkClasses('faq')} to="/faq" onClick={() => handleNavLinkClick('faq')}>FAQ</Link>
          <Link className={getMobileNavLinkClasses('shop')} to="/shop" onClick={() => handleNavLinkClick('shop')}>Boutique</Link>

          <div className="w-full h-px bg-gray-700 my-4"></div> {/* Séparateur */}

          <Link className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-300 w-fit" to="/contact" onClick={() => handleNavLinkClick('contact')}>
            Contact
          </Link>

          {/* Menu déroulant Langue pour mobile */}
          <div className="w-full text-center" ref={mobileLanguageRef}>
            <button
              onClick={() => setIsMobileLanguageOpen((prevState) => !prevState)}
              className="relative text-white hover:text-purple-400 transition duration-300 focus:outline-none py-2 px-2 flex items-center justify-center w-full"
            >
              {currentLanguage.flag} {currentLanguage.name}
              <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isMobileLanguageOpen && (
              <div className="flex flex-col items-center space-y-2 mt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="text-gray-200 hover:text-purple-400 transition duration-300 focus:outline-none py-1"
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setIsMobileLanguageOpen(false);
                      setIsMenuOpen(false); // Ferme le menu principal après la sélection de la langue
                    }}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavbarHeader;