import React from "react";
import { FaBackspace, FaUser } from "react-icons/fa";

function Howitworks() {

    const list = [
    
      {
        id: 1,
        icon: <FaBackspace size={22} className="text-[#c22d0b]" />,
        nbr: "01",
        title: "Année d’excellence",
      },
      {
        id: 2,
        icon: <FaBackspace size={22} className="text-[#c22d0b]" />,
        nbr: "500+",
        title: "Affaires Réussies",
      },
      // {
      //   id: 3,
      //   icon: <FaBook size={22} className="text-primary" />,
      //   nbr: "80",
      //   title: "ÉTUDIANTS",
      // },
      {
        id: 4,
        icon: <FaUser size={22} className="text-[#c22d0b]" />,
        nbr: "90%",
        title: "Satisfaction Client",
      },
    ];

  return (
    <div>
      <div className="w-full h-56 bg-blue-950 
       flex justify-center pt-10">
        <div className=" flex flex-col ">
          <div className="text-white  md:text-[2.5em] font-[700] text-[1.7em] text-center">
         Faites-nous confiance
          </div>
         
        </div>
      </div>
      <div className="container lg:h-60 bg-white">
        <div className="w-full h-full bg-white shadow-xl rounded-lg transform lg:-translate-y-20 -translate-y-5 grid lg:grid-cols-3 md:grid-cols-2  grid-cols-2 md:gap-10 items-center md:p-10 py-5 lg:py-0">
          {list.map((item) => {
            return (
              <div className="md:w-72 flex flex-col ">
                <div className="flex flex-col justify-center items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex justify-center items-center">
                    {item.icon}
                  </div>
                </div>
                <div className="font-bold text-[#c22d0b] text-[1.4em] md:text-[3em] text-center  ">
                  {item.nbr}
                </div>
                <div className="text-sm md:text-xl text-center text-blue-950 ">
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Howitworks;
