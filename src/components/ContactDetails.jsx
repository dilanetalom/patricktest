import React from "react";
import style from "./style.module.css";
import { HiMapPin } from "react-icons/hi2";
import { BiSolidEnvelope, BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";

function ContactDetails() {
  const infos = [
    {
      id: 0,
      title: "Notre Adresse",
      icon: <HiMapPin size={54} />,
      content: [
        {
          value: "Cameroun, Douale ",
          mail: false,
        },
      ],
    },
    {
      id: 1,
      title: "Numéro de téléphone",
      icon: <BiSolidPhoneCall size={54} />,
      content: [
        {
          value: "+237 690 841 749",
          mail: false,
        },
   
      ],
    },
    {
      id: 2,
      title: "Adresse Email",
      icon: <BiSolidEnvelope size={54} />,
      content: [
        {
          value: "dilanetalom8@gmail.com",
          mail: true,
        },
      ],
    },
  ];
  return (
    <div
      className={`py-20 bg-blue-950 lg:px-[180px] px-4 ${style.details} relative`}
    >
      <div className="w-full flex gap-4 flex-wrap justify-center md:justify-between items-center">
        {infos &&
          infos.map((item) => {
            return (
              <div
                key={item.id}
                className="inline-flex flex-col items-center text-center gap-2"
              >
                <div className="rounded-full text-white h-36 w-36 bg-[#c22d0b] flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="h-36 mt-2">
                  <span className="text-2xl text-white font-semibold">
                    {item.title}
                  </span>
                  <div className="flex flex-col gap-1">
                    {item.content &&
                      item.content.map((item2) => {
                        return item2.mail ? (
                          <Link
                            to="#"
                            onClick={(e) => {
                              window.location.href =
                                "mailto:support@protravel.com";
                              e.preventDefault();
                            }}
                            key={item2.value}
                            className="text-gray-300"
                          >
                            {item2.value}
                          </Link>
                        ) : (
                          <span key={item2.value} className="text-gray-300">
                            {item2.value}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ContactDetails;
