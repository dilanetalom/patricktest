import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./component.css";

function Allservice() {
  const list = [
    {
      id: 1,
      title: "Développement web",
      path:"/express",
      description:
        "Créez un site web personnalisé qui attire vos visiteurs et booste votre présence en ligne. Votre succès commence ici.",
    },
    {
      id: 2,
      title: "Maintenance Informatique",
      path:"/express",
      description:
        "Protégez vos systèmes avec notre maintenance proactive pour une performance optimale et une tranquillité d’esprit.",
    },
    {
      id: 3,
      title: "Cybersécurité",
      path:"/express",
      description:
        "Sécurisez vos données contre les menaces numériques avec nos solutions de cybersécurité robustes et fiables.",
    },
    {
      id: 4,
      title: "Entrée express",
      path:"/express",
      description:
        "Destiné aux immigrants qualifiés qui souhaitent s’établir de façon permanente au Canada",
    },
    {
      id: 5,
      title: "Réseaux",
      path:"/express",
      description:
        "Optimisez vos communications avec nos solutions de réseau fiables, rapides et adaptées à vos besoins professionnels.",
    },
    {
      id: 6,
      title: "Infogérance",
      path:"/express",
      description:
        "Confiez-nous la gestion de votre informatique pour vous concentrer sur ce qui compte vraiment : votre entreprise",
    },
    {
      id: 7,
      title: "Applications mobiles",
      path:"/express",
      description:
        "Bénéficiez de conseils d’experts pour optimiser votre stratégie IT et atteindre vos objectifs avec succès.",
    },
    {
      id: 8,
      title: "Création d’entreprises",
      path:"/express",
      description:
        "Optimisez vos communications avec nos solutions de réseau fiables, rapides et adaptées à vos besoins professionnels.",
    },
    {
      id: 9,
      title: "Graphic Design",
      path:"/express",
      description:
        "Confiez-nous la gestion de votre informatique pour vous concentrer sur ce qui compte vraiment : votre entreprise",
    },
    {
      id: 10,
      title: "SEA & SEO",
      path:"/express",
      description:
        "Bénéficiez de conseils dʼexperts pour optimiser votre stratégie IT et atteindre vos objectifs avec succès.",
    },
    {
      id: 11,
      title: "Social Media Management",
      path:"/express",
      description:
        "Optimisez vos communications avec nos solutions de réseau fiables, rapides et adaptées à vos besoins professionnels.",
    },
    {
      id: 12,
      title: "Digital Management",
      path:"/express",
      description:
        "Bénéficiez de conseils dʼexperts pour optimiser votre stratégie IT et atteindre vos objectifs avec succès.",
    },
  ];

  const navigate = useNavigate()
  return (
    <div className="container  pb-10 w-full bg-white flex flex-col gap-5 ">
      <div className="w-full py-5 flex justify-center items-center text-blue-950 md:text-[2.5em] text-[2em] font-[700]">
        Autres services
      </div>
      <div className=" w-full grid lg:grid-cols-4 md:grid-cols-2 gap-3 justify-center items-center ">
        {list.map((item) => {
          return (
            <div
              className=" h-[250px] border border-gray-300 rounded-lg   hover:text-white cursor-pointer p-6"
              key={item.id}
            >
              {/* <div className="w-full h-1/4"></div> */}
              <div className="w-full h-3/4 flex flex-col gap-4">
                <div className="text-blue-950 font-[500] text-[1.4em] text-center card_text">
                  {item.title}
                </div>
                <div className="text-center text-[13px] text-blue-950 font-[300] card_text">
                  {" "}
                  {item.description}
                </div>
              </div>
              <div className="w-full h-1/4 flex items-center justify-center">
                <Link to="/express" className="text-[#c22d0b] font-[500] card_text" >
                  En Savoir plus
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Allservice;
