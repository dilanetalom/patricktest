import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import TestimonialCard from './TestimonialCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Données de plusieurs témoignages sous forme de tableau
const testimonials = [
  {
    quote: "Très à l'écoute de mes besoins, MPE Digital Solution a développé ensuite la solution adaptée, très personnalisée. Superbe agence de création de site internet, les designs des sites sont ergonomique et beaux.",
    author: "Dilane",
    role: "Fondateur de MIAX Tech",
    image: "https://via.placeholder.com/150",
  },
  {
    quote: "Une agence très professionnelle et réactive. Le résultat a dépassé toutes nos attentes. Je recommande vivement !",
    author: "Leslie",
    role: "PDG de StartUp X",
    image: "https://via.placeholder.com/150",
  },
  {
    quote: "Grâce à leur expertise, notre visibilité en ligne a explosé. Un véritable partenaire digital !",
    author: "Jean Marc",
    role: "Directeur Marketing",
    image: "https://via.placeholder.com/150",
  },
];

const TestimonialSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null); // Utilisation de useRef pour accéder à l'instance du slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => setActiveSlide(current),
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <section className="relative lg:px-[110px] px-4 py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <div className="mb-4">
            <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              TÉMOIGNAGES
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-blue-950 mb-4">
            Quelques Clients Satisfaits
          </h2>
          <p className="text-blue-950 max-w-sm mx-auto md:mx-0">
            Ils ont fait confiance à notre Agence Web et Digitale <b> MPE Digital Solution </b>, et ils ont tenu à s'exprimer
          </p>

          <div className="mt-8 flex justify-center md:justify-start space-x-3">
            {testimonials.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === activeSlide ? 'bg-indigo-600 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <Slider ref={sliderRef} {...settings} className="w-full ">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;