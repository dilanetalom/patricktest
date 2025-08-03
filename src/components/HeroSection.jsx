// src/components/HeroSection.js
import React from 'react';
import profil from "../images/profil.png"

function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[600px] md:min-h-[500px] lg:min-h-[80vh]   overflow-hidden p-8 ">
      {/* Abstract Shapes (mimicking the image) */}
      <div className="absolute top-0 right-10 w-3/5 h-full bg-gradient-to-bl from-gray-600  to-gray-600 opacity-40 transform skew-y-6 -translate-x-1/2 hidden md:block">
        <div>
            <img src={profil} alt="" />
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-2/5 h-1/2 bg-gradient-to-tr from-teal-400 via-gray-500 to-transparent opacity-40 transform -skew-y-3 translate-y-1/2 hidden md:block"></div> */}

      {/* Image Section */}
      <div className="relative z-10 w-full md:w-1/2 lg:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <img
          src="https://via.placeholder.com/400x500/00FFFF/FFFFFF?text=Designer" // Replace with your image path
          alt="Designer"
          className="rounded-lg shadow-xl max-h-[450px] object-cover border-4 border-white transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full md:w-1/2 lg:w-2/5 text-center md:text-left p-4">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-lg">
         Développeur fullstack
        </h1>
        <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
          Talom Defo Franck Dilane
          <br />
          <span className="text-base text-gray-400 italic">un développeur passionné spécialisé en [technologies ou 
            langages de programmation]. J'aime créer des applications performantes et conviviales. Mon objectif est 
            de rendre la technologie accessible et agréable. Explorez mon portfolio pour découvrir mes projets !</span>
        </p>
        <div className="flex justify-center items-end md:justify-start space-x-6 text-gray-300">
          <a href="#" className="hover:text-white transition duration-300">
            <i className="fab fa-facebook-f text-2xl"></i> {/* You'll need Font Awesome or similar */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.815c-3.235 0-4.185 1.777-4.185 4.597v2.403z"/></svg>
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <i className="fab fa-twitter text-2xl"></i>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.064 9.172c-.222 7.818-8.243 12.029-11.864 10.393-.57-.257-.406-.782-.475-1.36-.062-.578-.31-1.096-.757-1.503-.448-.407-1.042-.647-1.637-.621-.595.026-1.168.271-1.663.702-.495.431-1.006.848-1.508.971-.502.123-1.008-.007-1.503-.385-.495-.378-.971-.979-1.391-1.644-1.644-2.529-2.024-5.228-1.522-6.526.495-1.298 1.838-2.585 3.251-3.692.65-.502 1.341-.954 2.059-1.31.718-.356 1.458-.621 2.22-.767.761-.146 1.54-.156 2.308-.029.768.126 1.52.408 2.24.819.721.411 1.405.955 2.027 1.628.622.673 1.17 1.467 1.624 2.366.454.9.805 1.892 1.045 2.96.24 1.068.36 2.195.352 3.329zm-4.735 1.066c-.636-.264-1.282-.533-1.898-.82-.616-.288-1.2-.591-1.748-.909-1.096-.641-2.091-1.36-2.936-2.204-.846-.846-1.564-1.841-2.204-2.936-.318-.548-.621-1.132-.909-1.748-.288-.616-.556-1.262-.82-1.898-.264-.636-.533-1.282-.82-1.898-.288-.616-.591-1.2-.909-1.748-.641-1.096-1.36-2.091-2.204-2.936-.846-.846-1.841-1.564-2.936-2.204-.548-.318-1.132-.621-1.748-.909-.616-.288-1.262-.556-1.898-.82-1.847-.768-3.769-1.04-5.46-1.04-1.691 0-3.324.283-4.595.823-1.272.54-2.206 1.307-2.791 2.253-.585.946-.82 2.12-.663 3.38.156 1.26.584 2.45 1.268 3.511.684 1.06 1.579 2.01 2.656 2.821 1.077.811 2.327 1.488 3.69 1.986 1.364.498 2.825.801 4.31.865 1.485.064 2.96-.064 4.343-.384 1.383-.32 2.628-.807 3.73-1.442z"/></svg>
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <i className="fab fa-pinterest text-2xl"></i>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 15h-3.34c.007 1.13.061 2.247.164 3.336 1.554.218 3.166.326 4.8-.008 1.474-.308 2.671-1.262 3.09-2.826.314-1.168.18-2.316-.226-3.414-.406-1.098-1.092-2.046-2.01-2.73-1.002-.75-2.275-1.135-3.614-1.117-2.732.036-4.577 2.007-4.238 4.706.126 1.002.502 1.956 1.11 2.775.608.82 1.436 1.472 2.44 1.914.966.425 2.052.613 3.12.56.335-.015.67-.042 1-.082v-3.864c-.38-.052-.76-.088-1.132-.109-1.205-.07-2.29.352-2.92 1.28-.63.928-.707 2.12-.352 3.188.355 1.068.966 1.972 1.776 2.613.844.664 1.815 1.118 2.894 1.353.116-.364.21-.735.28-1.11.07-.375.114-.755.132-1.136h-4.668zm2.08-10h2v5h-2v-5z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;