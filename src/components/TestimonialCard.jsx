import React from 'react';
import { FaUser } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="relative p-8 bg-white rounded-lg h-auto z-50 ">
      {/* Icône de guillemets */}
      <svg
        className="absolute top-0 left-0 w-10 h-10 text-gray-200 transform -translate-x-2 -translate-y-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.25 15.65c-2.8 3.51-5.32 4.41-7.1 3.51-1.39-.71-2.12-2.78-2.07-5.02.05-2.08.97-4.88 3.39-8.47l.82 1.34c-1.89 2.76-2.5 4.79-2.32 6.07.12.83.69 1.4 1.25 1.5.89.17 1.9-.3 3.33-1.6l.82 1.35zm8.48 0c-2.8 3.51-5.32 4.41-7.1 3.51-1.39-.71-2.12-2.78-2.07-5.02.05-2.08.97-4.88 3.39-8.47l.82 1.34c-1.89 2.76-2.5 4.79-2.32 6.07.12.83.69 1.4 1.25 1.5.89.17 1.9-.3 3.33-1.6l.82 1.35z" />
      </svg>
      <p className="relative text-lg italic text-gray-700">
        "{testimonial.quote}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        {/* <img
          className="w-12 h-12 rounded-full mr-4 object-cover"
          src={testimonial.image}
          alt={testimonial.author}
        /> */}
        <FaUser size={30}/>
        <div>
          <p className="text-blue-950 font-semibold">{testimonial.author}</p>
          <p className="text-sm text-blue-950">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;