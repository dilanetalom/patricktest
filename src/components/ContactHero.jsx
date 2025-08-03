import React from "react";
import style from "./style.module.css";
import { BsSendCheckFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

function ContactHero() {
  return (
    <div
      className={`${style.background} h-[70vh] md:h-[70vh] pt-10 md:pt-0 flex items-center lg:px-[110px] px-4`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-white font-bold text-2xl md:text-5xl">
          <span>Prenez rendez-vous</span>
          <span>ou envoyer nous un message</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-white p-4 px-6 rounded-2xl text-primary inline-flex max-w-fit items-center gap-2 group animation duration-200 border-transparent border-[2px] hover:bg-primary hover:text-blue-950">
            Prendre rendez-vous
            <span>
              <FaCalendarAlt />
            </span>
          </button>
          <button className="bg-blue-950 p-4 px-6 rounded-2xl text-white inline-flex max-w-fit items-center gap-2 group animation duration-200 border-none border-[2px] hover:bg-white hover:text-blue-950">
            Envoyez un message
            <span>
              <BsSendCheckFill />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
