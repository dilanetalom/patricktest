import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Services de conception de sites web",
      subtitle: "qui génèrent des résultats",
      description: "CONCEPTION DE SITES WEB | APPLICATIONS | GRAPHIQUE | IMAGE DE MARQUE | RÉFÉRENCEMENT WEB",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      animation: "slideInLeft"
    },
    {
      id: 2,
      title: "Solutions digitales innovantes",
      subtitle: "pour votre entreprise",
      description: "DÉVELOPPEMENT | DESIGN | MARKETING DIGITAL | E-COMMERCE | APPLICATIONS MOBILES",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      animation: "fadeInUp"
    },
    {
      id: 3,
      title: "Transformez vos idées",
      subtitle: "en réalité numérique",
      description: "STRATÉGIE DIGITALE | UX/UI DESIGN | DÉVELOPPEMENT SUR MESURE | MAINTENANCE | SUPPORT",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      animation: "zoomIn"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const getAnimationClass = (animation) => {
    switch (animation) {
      case 'slideInLeft':
        return 'animate-slide-in-left';
      case 'fadeInUp':
        return 'animate-fade-in-up';
      case 'zoomIn':
        return 'animate-zoom-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Header Navigation */}
   

      {/* Slider Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-800 ${
              index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-blue-950/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-30 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                {/* Brand Logo */}
                <div className={`mb-8 ${index === currentSlide ? getAnimationClass(slide.animation) : 'opacity-0'}`}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
                  TRANSFORMEZ VOTRE AVENIR DIGITAL
                  </h1>
                </div>

                {/* Main Content */}
                <div className={`${index === currentSlide ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
                  <h2 className="text-3xl md:text-5xl font-light mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-light mb-8 text-gray-200">
                    {slide.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl mb-12 font-light tracking-wider">
                    {slide.description}
                  </p>
                  <button className="bg-[#c22d0b] hover:bg-blue-950 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    DEMANDER UN DEVIS
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default HeaderSlider;