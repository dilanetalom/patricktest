"use client";
import { Accordion, AccordionTab } from 'primereact/accordion';
// import Link from 'next/link';
import React, { useState } from 'react';



function Question() {


    const [activeIndex, setActiveIndex] = useState(null);
    const handleTabChange = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const toggleIcon = (index) => {
        return activeIndex === index ? 'icon-minus' : 'icon-plus';
    };

    const renderIcon = (index) => {
        return (
          <span className="text-xl">
            {activeIndex === index ? '➖' : '➕'}
          </span>
        );
      };

    return (
        <div className='w-full bg-white h-auto  md:pt-16 container py-10 flex flex-col justify-center mx-auto items-center md:gap-20 gap-10'>

            <div id="questions" className='w-full flex flex-col justify-center items-center '>
                <div className='text-center  lg:w-1/2'>
                    <p className='lg:text-[40px] text-[24px] font-bold' data-aos="zoom-in"
                    >Questions</p>
                    <p className='text-[13px] font-[400] text-center'
                        data-aos="zoom-in"
                    >Nous avons pris le soin de répondre à vos intérrogations. Si vous avez d'autres
                        préoccupations

                    </p>
                </div>
            </div>

            <div className='w-full flex justify-center  bg-white' >
                <Accordion activeIndex={activeIndex} onTabChange={(e) => handleTabChange(e.index)} className='lg:w-full w-full bg-white'>
                    <AccordionTab
                        header={
                            <div className="border-b-2 py-8 border-black border-opacity-50 bg-white flex justify-between">
                                <span className="header-text lg:text-[16px] text-[13px] font-bold">
                                    Qui êtes-vous ?
                                </span>
                                {renderIcon(0)}
                            </div>
                        }
                        className='w-full'
                    >
                        <p className="ml-2 text-justify py-3 lg:text-[16px] text-[13px]">
                            MPE DIGITAL SOLUTION est une entreprise spécialisée . Forts d’une équipe expérimentée et rigoureuse, nous accompagnons
                            les particuliers, les entreprises et les collectivités dans la réalisation de leurs projets
                            , efficacité et durabi                      </p>
                            
                    </AccordionTab>

                    <AccordionTab
                        header={
                            <div className="header-container border-b-2 py-8 border-black bg-white border-opacity-50 flex justify-between">
                                <span className="header-text lg:text-[16px] text-[13px] font-bold">
                                    Que proposez-vous comme services ?
                                </span>
                                <span className={`header-icon ${toggleIcon(1)}`}></span>
                                {renderIcon(1)}
                            </div>
                        }
                    >
                        <p className="ml-2 text-justify py-3 lg:text-[16px] text-[13px]">
                            
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae neque cum nisi commodi assumenda deserunt autem maiores, eius eum expedita debitis harum facere facilis ea architecto, nihil perferendis, ut consectetur!
                                                 </p>
                    </AccordionTab>

                    <AccordionTab
                        header={
                            <div className="header-container border-b-2 py-8 border-black bg-white border-opacity-50 flex justify-between">
                                <span className="header-text lg:text-[16px] text-[13px] font-bold">
                                    Quels sont vos tarifs ?
                                </span>
                                <span className={`header-icon ${toggleIcon(2)}`}></span>
                                {renderIcon(2)}
                            </div>
                        }
                    >
                        <p className="ml-2 text-justify py-3 lg:text-[16px] text-[13px]">
                            
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo praesentium, asperiores quisquam totam eligendi alias adipisci doloremque ipsum consequatur quae! Minima recusandae voluptate dolore aperiam similique ipsum natus cumque omnis!
                                                    </p>
                    </AccordionTab>

                    <AccordionTab
                        header={
                            <div className="header-container border-b-2 py-8 border-black bg-white border-opacity-50 flex justify-between">
                                <span className="header-text lg:text-[16px] text-[13px] font-bold">
                                    Proposez-vous des offres ?
                                </span>
                                <span className={`header-icon ${toggleIcon(3)}`}></span>
                                {renderIcon(3)}
                            </div>
                        }
                    >
                        <p className="ml-2 text-justify py-3 lg:text-[16px] text-[13px]">
                            
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur 
                            qui debitis voluptas, molestiae dolorem officia earum odio nostrum, doloribus facilis culpa, 
                            modi omnis nobis in eligendi repudiandae veritatis necessitatibus cum.
                                                   </p>
                    </AccordionTab>
                    <AccordionTab
                        header={
                            <div className="header-container border-b-2 py-8 border-black bg-white border-opacity-50 flex justify-between">
                                <span className="header-text lg:text-[16px] text-[13px] font-bold">
                                    Pour qui travaillez-vous ?
                                </span>
                                <span className={`header-icon ${toggleIcon(4)}`}></span>
                                {renderIcon(4)}
                            </div>
                        }
                    >
                        <p className="ml-2 text-justify py-3 lg:text-[16px] text-[13px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quae maxime accusantium voluptate culpa quidem debitis? Perspiciatis blanditiis cumque distinctio,
                             delectus asperiores nesciunt. Culpa earum temporibus, neque quod velit non.
                                                  </p>
                    </AccordionTab>
                </Accordion>
            </div>


            <div className='container w-full flex flex-col lg:gap-3  gap-5 justify-center items-center'>
                <h3 className='lg:text-[33px]  text-[24px] font-bold ' data-aos="zoom-in">Vous avez un projet ?</h3>
                <p className='lg:w-[567px] lg:text-[16px] text-[13px] text-center py-3' data-aos="zoom-in"> </p>
                <button className='w-[222px] px-[10px] py-[12px] text-white rounded-[5px] bg_red' data-aos="zoom-in">Discutons de votre projet</button>
            </div>

        </div>
    )
}

export default Question