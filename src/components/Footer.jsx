import React from 'react';

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 lg:px-[110px] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Section LIENS UTILES */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">LIENS UTILES</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition duration-200">Maison</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">À propos de nous</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Aperçu du service</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Tarification</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Portefeuille</a></li>
          </ul>
        </div>

        {/* Section LIEN UTILE */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">LIEN UTILE</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition duration-200">Témoignages</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Nos clients</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Conception de sites Web</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Développement d'applications</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Contactez-nous</a></li>
            <li><a href="#" className="hover:text-white transition duration-200">Plan du site</a></li>
          </ul>
        </div>

        {/* Section CONTACTEZ-NOUS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">CONTACTEZ-NOUS</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Adresse: Rond-point EMIA, Yaoundé, Cameroun</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+33 6 68 89 86 92</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-3" />
              </svg>
              <span>Courriel: support@highupweb.com</span>
            </div>
          </div>
        </div>

        {/* Section ABONNEZ-VOUS À NOTRE NEWSLETTER */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">ABONNEZ-VOUS À NOTRE NEWSLETTER</h3>
          <p className="text-sm mb-4">
            Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et offres.
          </p>
          <div className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Adresse email"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-gray-400"
            />
            <button className="border text-white font-semibold py-3 rounded-md hover:from-teal-600 hover:to-blue-600 transition duration-300">
              SOYEZ AVERTI
            </button>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        <span>&copy; Copyright 2025 Highupweb Tous droits réservés</span>
      </div>

      {/* Boutons flottants "Haut" et WhatsApp */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-40">
        {/* Bouton Haut */}
        <button
          onClick={handleScrollToTop}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
          aria-label="Retour en haut de page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="sr-only">Haut</span>
        </button>

        {/* Bouton WhatsApp */}
        <a
          href="https://wa.me/237672424240"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          aria-label="Contacter via WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2C7.309 2 3.213 3.578 3.213 8.356c0 1.261.374 2.477 1.054 3.565L3 22l6.241-1.636c.928.257 1.916.402 2.799.402 4.733 0 8.82-3.578 8.82-8.356S16.773 2 12.04 2zm3.393 12.185c-.147.243-.374.243-.541.127-.22-.162-.647-.282-.953-.402-.289-.115-.658-.225-.97-.225-.346 0-.616.12-.905.402-.289.282-.447.45-.616.595-.169.145-.374.192-.616.077-.243-.115-1.018-.378-1.946-.893-.728-.402-1.215-.728-1.428-.97-.213-.242-.259-.346-.146-.479.113-.133.259-.289.374-.402.115-.113.243-.225.328-.328.085-.102.147-.243.077-.358-.07-.115-.402-.97-.57-1.393-.169-.423-.337-.346-.465-.346-.127 0-.289-.009-.447-.009-.162 0-.447.057-.69.172-.243.115-.928.917-.928 2.224 0 1.306.953 2.578 1.099 2.766.146.188 1.838 2.923 4.43 4.027 2.593 1.104 2.593.738 2.872.646.28-.092.833-.378.989-.661.156-.282.156-.519.115-.596-.041-.077-.147-.115-.315-.192z"/>
          </svg>
          <span className="sr-only">Envoyez-nous un message</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;