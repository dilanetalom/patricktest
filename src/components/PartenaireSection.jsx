import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import patrick from "../images/patrick.png"

// Tableau des logos des partenaires (remplacez les chemins)
const partners = [
    { name: 'Partner 1', logo: patrick },
    { name: 'Partner 2', logo: patrick },
    { name: 'Partner 3', logo: patrick },
    { name: 'Partner 4', logo: patrick },
    { name: 'Partner 5', logo: patrick },
    { name: 'Partner 6', logo: patrick },
    { name: 'Partner 7', logo: patrick },
];

const PartnersSection = () => {
    // Configuration de `react-slick` pour le défilement automatique
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Affiche 5 logos à la fois sur un grand écran
        slidesToScroll: 1,
        autoplay: true, // Active le défilement automatique
        autoplaySpeed: 2000, // Défile toutes les 2 secondes
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ]
    };

    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-4">
                    Nos Partenaires
                </h2>
                <p className="text-lg text-blue-950 mb-12 max-w-2xl mx-auto">
                    Nous sommes fiers de collaborer avec des entreprises de renom pour offrir les meilleures solutions digitales à nos clients.
                </p>
                
                <div className="mx-auto max-w-6xl">
                    <Slider {...settings}>
                        {partners.map((partner, index) => (
                            <div key={index} className="p-4">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-full h-auto max-h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-auto"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;