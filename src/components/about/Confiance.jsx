import React from "react";
import about2 from "../../images/about2.jpeg";
import { FaAngleRight } from "react-icons/fa";

function Confiance() {
  return (
    <div className="pb-28 bg-white  lg:px-[110px] px-4 lg:mt-20">
      <div className="w-full lg:h-96 md:h-[500px] h-screen md:gap-0 gap-14 flex md:flex-row flex-col items-center  ">
        <div className="md:w-1/2 h-80 md:pr-20 flex  items-center  ">
          <div className="h-3/4 w-full flex flex-col gap-5">
            <div className="text-[1.5em] md:text-[2.5em] font-[700] text-blue-950">
            Notre Parcours
            </div>
            <div className="text-blue-950 font-[100] text-justify spacing-10 ">
            Notre aventure a commencé avec une simple idée : rendre la technologie accessible à tous.
             Depuis nos débuts, nous avons évolué en écoutant les besoins de nos clients. 
             Chaque projet que nous avons réalisé a renforcé notre passion pour lʼinnovation. Nous avons construit une équipe dʼexperts talentueux, unis par la volonté de transformer les défis numériques en opportunités. Aujourdʼhui, nous sommes fiers dʼaccompagner des particuliers, des PME et des grandes entreprises 
            dans leur quête de solutions technologiques efficaces. Ensemble, nous écrivons lʼavenir numérique de demain.
            </div>
            <div>
              <button className="py-5 px-4 w-60 bg-blue-950 rounded-[10px] text-white font-[500] flex items-center gap-2 justify-center">
                Prendre rendez-vous
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] mt-16 md:mt-0 md:h-full h-80 relative">
          <div className="w-full h-full bg-[#c22d0b] transform translate-x-5 translate-y-5 absolute"></div>
          <div className="w-full h-full absolute ">
            <img
              src={about2}
              className="h-full w-full object-cover object-center"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confiance;
