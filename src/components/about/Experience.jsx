import React from "react";
import { FaBackspace, FaBook, FaUser } from "react-icons/fa";

function Experience() {
  const list = [
    {
      id: 1,
      icon: <FaUser size={22} className="text-primary" />,
      nbr: "250",
      title: "CLIENTS SATISFAITS",
    },
    {
      id: 2,
      icon: <FaBackspace size={22} className="text-primary" />,
      nbr: "120",
      title: "TRAVAILLEURS",
    },
    // {
    //   id: 3,
    //   icon: <FaBook size={22} className="text-primary" />,
    //   nbr: "80",
    //   title: "ÉTUDIANTS",
    // },
    {
      id: 4,
      icon: <FaUser size={22} className="text-primary" />,
      nbr: "50",
      title: "TOURISTES",
    },
  ];
  return (
    <div>
      <div className="w-full h-96 bg-blue-950 pt-10 flex justify-center items-center">
        <div className="w-3/5 flex flex-col gap-10">
          <div className="text-white font-[500] md:text-[2.7em] text-[1.7em] text-center">
          Comment Nous Aidons
          </div>
          <div className="text-white  text-center text-[14px] md:text-base">
          Chez mpe digital solutions, nous offrons une gamme complète dʼaccompagnements 
          pour répondre à tous vos besoins numériques. Nous développons des sites web personnalisés,
           assurons la maintenance informatique, et protégeons vos données grâce à notre expertise en cybersécurité. Nos solutions de réseaux et dʼinfogérance garantissent une performance optimale. Avec notre conseil IT, nous vous aidons à naviguer dans la transformation digitale et à faire croître votre entreprise avec confiance.
          </div>
        </div>
      </div>
      {/* <div className="lg:px-[110px] px-4 lg:h-60 bg-white">
        <div className="w-full h-full bg-white shadow-xl rounded-lg transform lg:-translate-y-28 -translate-y-5 grid lg:grid-cols-4 md:grid-cols-2  grid-cols-2 md:gap-10 items-center md:p-10 py-5 lg:py-0">
          {list.map((item) => {
            return (
              <div className="md:w-72 flex flex-col ">
                <div className="flex flex-col justify-center items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex justify-center items-center">
                    {item.icon}
                  </div>
                </div>
                <div className="font-bold text-primary text-[1.4em] md:text-[3em] text-center  ">
                  {item.nbr}
                </div>
                <div className="text-sm md:text-xl text-center">
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default Experience;
