import React, { useState } from 'react';

const teamData = [
  {
    id: 'intro',
    type: 'intro',
    title: "Bienvenue dans l'équipe !",
    subtitle: 'Découvrez qui nous sommes et ce qui nous passionne.',
  },
  {
    id: 'member-1',
    type: 'personnel',
    name: 'Jane Doe',
    role: 'Chef de projet',
    bio: 'Passionnée de randonnée et de design minimaliste. Sa mission est de s’assurer que nos projets sont toujours livrés à temps et avec brio.',
    image: 'https://images.unsplash.com/photo-1549448866-93d3950c608f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'member-2',
    type: 'personnel',
    name: 'John Smith',
    role: 'Développeur Full-Stack',
    bio: 'Fan de jeux vidéo et de café de spécialité. Il est le maître des lignes de code et résout les problèmes les plus complexes avec une facilité déconcertante.',
    image: 'https://images.unsplash.com/photo-1520111162468-2c07044a6f7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'member-3',
    type: 'personnel',
    name: 'Emily Davis',
    role: 'Designer UX/UI',
    bio: "Experte en créativité, elle s'assure que nos produits sont non seulement beaux, mais aussi intuitifs et agréables à utiliser. En dehors du travail, elle adore la peinture à l'huile.",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d65495c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'conclusion',
    type: 'conclusion',
    title: 'Ensemble, nous créons l\'avenir !',
    subtitle: 'Merci de faire partie de notre incroyable équipe.',
  },
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderSlide = () => {
    const slideData = teamData[currentSlide];

    switch (slideData.type) {
      case 'intro':
        return (
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-indigo-700">
              {slideData.title}
            </h1>
            <p className="mt-4 text-2xl text-gray-700">
              {slideData.subtitle}
            </p>
          </div>
        );
      case 'personnel':
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Rencontrez {slideData.name}
            </h1>
            <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
              <img
                src={slideData.image}
                alt={slideData.name}
                className="w-48 h-48 object-cover mx-auto rounded-full mb-4 ring-4 ring-indigo-300"
              />
              <h2 className="text-2xl font-semibold text-gray-900">
                {slideData.name}
              </h2>
              <p className="text-lg text-indigo-600 font-medium">
                {slideData.role}
              </p>
              <p className="mt-4 text-gray-600">
                {slideData.bio}
              </p>
            </div>
          </div>
        );
      case 'conclusion':
        return (
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-indigo-700">
              {slideData.title}
            </h1>
            <p className="mt-4 text-2xl text-gray-700">
              {slideData.subtitle}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-2xl p-12 w-full max-w-4xl transition-all duration-500 ease-in-out transform">
        {renderSlide()}
      </div>

      {/* Pagination par points */}
      <div className="mt-8 flex space-x-2">
        {teamData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-indigo-500 w-6' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Presentation;