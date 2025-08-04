import React from "react";
// import about from "../assets/contact1.png";
// import { PrimaryButton } from "../Components/Buttons";
import style from "./about.module.css";
import { PrimaryButton } from "../Buttons";

function AboutFirst() {
  return (
    <div className="lg:px-[110px] px-4 w-full md:h-[700px] pt-36 pb-10 flex md:flex-row flex-col bg-white gap-10 md:gap-0">
      <div className="md:w-1/2 h-full relative">
        <div className="w-full h-full absolute"></div>
        <div className={`w-full h-full ${style.about}`}>
          {/* <img
            src={about}
            alt=""
            className="h-[500px] w-full object-cover object-center"
          /> */}
        </div>
      </div>
      <div className="flex items-center md:w-1/2 h-full ">
        <div className="flex flex-col md:pl-20 gap-7">
          <div className="flex gap-5 items-center">
            <div className="h-[2px] w-14 bg-[#c22d0b]"></div>
            <div>A PROPOS DE NOUS</div>
          </div>
          <div className="text-[2em] font-[500] text-justify text-primary">
            Que faisons nous?
          </div>
          <div className="font-[200] text-blue-950 text-[16px] ">
            Chez mpe digital solutions, nous transformons vos idées en réalité avec des solutions informatiques sur mesure et innovantes.

            Notre équipe dʼexperts passionnés est là pour vous accompagner à chaque étape de votre transformation digitale. Que vous soyez un particulier, une PME ou une grande entreprise, nous avons les compétences pour répondre à vos besoins spécifiques. De la création de sites web attrayants à la cybersécurité avancée, nous assurons la maintenance et la gestion de vos systèmes informatiques. Nous croyons en des solutions simples et efficaces qui propulsent votre succès.
            Ensemble, construisons un avenir numérique radieux et sécurisé pour vous et votre entreprise.
          </div>
          <div>
            <PrimaryButton title="Voir Nos Services" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutFirst;
