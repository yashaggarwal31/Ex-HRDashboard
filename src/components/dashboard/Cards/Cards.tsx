import React from "react";

interface CardProps {
  item: {
    totalcount: number;
    total_responses: number;
  };
  onclick: (id: string) => void;
  isActive: boolean;
  type: string;
  id: string;
}

const Cards: React.FC<CardProps> = ({ id, item, type, onclick, isActive }) => {
  const { totalcount, total_responses } = item;

  const ClassValue = isActive
    ? "focus:shadow-outline border-2 border-blue-300 boder-opacity-75 shadow-md"
    : "";

  const SvgSelector = (id: string) => {
    switch (id) {
      case "Tickets":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.4Z"></path>
          </svg>
        );
      case "Surveys":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M88,144V128a8,8,0,0,1,16,0v16a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V120a8,8,0,0,0-16,0v24A8,8,0,0,0,128,152Zm32,0a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,160,152Zm56-72v96h8a8,8,0,0,1,0,16H136v17.38a24,24,0,1,1-16,0V192H32a8,8,0,0,1,0-16h8V80A16,16,0,0,1,24,64V48A16,16,0,0,1,40,32H216a16,16,0,0,1,16,16V64A16,16,0,0,1,216,80ZM136,232a8,8,0,1,0-8,8A8,8,0,0,0,136,232ZM40,64H216V48H40ZM200,80H56v96H200Z"></path>
          </svg>
        );
      case "Feedback":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M96,104a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H104A8,8,0,0,1,96,104Zm8,40h64a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16Zm128,48a32,32,0,0,1-32,32H88a32,32,0,0,1-32-32V64a16,16,0,0,0-32,0c0,5.74,4.83,9.62,4.88,9.66h0A8,8,0,0,1,24,88a7.89,7.89,0,0,1-4.79-1.61h0C18.05,85.54,8,77.61,8,64A32,32,0,0,1,40,32H176a32,32,0,0,1,32,32V168h8a8,8,0,0,1,4.8,1.6C222,170.46,232,178.39,232,192ZM96.26,173.48A8.07,8.07,0,0,1,104,168h88V64a16,16,0,0,0-16-16H67.69A31.71,31.71,0,0,1,72,64V192a16,16,0,0,0,32,0c0-5.74-4.83-9.62-4.88-9.66A7.82,7.82,0,0,1,96.26,173.48ZM216,192a12.58,12.58,0,0,0-3.23-8h-94a26.92,26.92,0,0,1,1.21,8,31.82,31.82,0,0,1-4.29,16H200A16,16,0,0,0,216,192Z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const icon = SvgSelector(id);

  const handleCardClick = () => {
    onclick(id);
  };

  return (
    <div
      className={`max-w-sm rounded-lg bg-white p-3 pr-16 shadow ${ClassValue}`}
      onClick={handleCardClick}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="text-l font-bold tracking-tight text-blue-900 dark:text-white">
          {id}
        </h4>
      </div>
      <div className="grid-row-2 grid-col-2 grid">
        <p className="text-black-500 col-span-2 mb-2 font-bold dark:text-gray-400">
          Total {id}: {totalcount}
        </p>
        <p className="col-span-2 mb-2 font-bold text-gray-500 dark:text-gray-400">
          {type}: {total_responses}
        </p>
      </div>
    </div>
  );
};

export default Cards;
