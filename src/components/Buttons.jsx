export const WhiteButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="animation transition-all ease-out duration-300 bg-white text-gray-900 border-[1px] hover:border-white hover:text-white py-3 rounded-full cursor-pointer px-4  hover:bg-transparent text-sm md:text-[15px]"
    >
      {title ? title : ""}
    </button>
  );
};

export const PrimaryButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="animation transition-all ease-out duration-300 bg-[#c22d0b] font-bold hover:from-[#f9b700] border-[1px] border-transparent cursor-pointer hover:border-white  to-[#f9b700]/70 hover:to-[#ee390f] py-4 rounded-2xl px-4 text-white  hover:bg-red-600 text-sm md:text-[15px]"
    >
      {title ? title : ""}
    </button>
  );
};
