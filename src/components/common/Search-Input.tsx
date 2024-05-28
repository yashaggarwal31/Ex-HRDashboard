import { useState } from "react";

const Input = ({ onChangeCallback, placeholder }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    // <input
    //   type="text"
    //   value={value}
    //   onChange={handleChange}
    //   placeholder='Type to search'
    // />

    <div className="flex items-center gap-2 border-2 border-gray-300 rounded-full overflow-hidden px-2 has-[:focus]:border-sky-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="25px"
        height="25px"
      >
        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
      </svg>
      <input
        className=" bg-white h-[2rem] px-5 rounded-lg text-sm focus:outline-none w-full"
        type="search"
        value={value}
        onChange={handleChange}
        name="search"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
