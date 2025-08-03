export const TextInput = ({ value, type, onChange, required, placeholder }) => {
  return (
    <input
      type={type ? type : "text"}
      className="animation duration-300 placeholder:text-md placeholder:font-thin border-[1px] rounded-md px-3 py-2 border-primary/30 focus:border-primary/60 outline-none w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required ? required : false}
    />
  );
};
