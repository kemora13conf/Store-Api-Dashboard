import React from "react";

function YearForm({ year, setYear }) {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center items-center">
      <div 
        className="
            w-full max-w-[200px] ml-auto
            flex gap-3 justify-center items-center
            px-3 py-2 rounded-md
        "
    >
        <button
          className="
                    w-[40px] h-[30px] flex justify-center items-center
                    border border-light-quarternary-500 dark:border-dark-tertiary-400
                    text-light-quarternary-500 dark:text-dark-tertiary-400
                    shadow-md dark:shadow-dark 
                    rounded-full overflow-hidden
                    px-3 py-2
                  "
          onClick={() => setYear(year - 1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div 
            className="
                w-1/2 
                flex justify-center items-center
                bg-light-quarternary-500 dark:bg-dark-tertiary-400
                text-md text-light-primary-500 dark:text-dark-primary-500
                px-3 py-1
                shadow-md dark:shadow-dark
                rounded-full
            ">
          <span>
            {year}
          </span>
        </div>
        <button
          className="
          w-[40px] h-[30px] flex justify-center items-center
          border border-light-quarternary-500 dark:border-dark-tertiary-400
          text-light-quarternary-500 dark:text-dark-tertiary-400
          shadow-md dark:shadow-dark 
          rounded-full overflow-hidden
          px-3 py-2
            "
          onClick={() => setYear(year + 1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default YearForm;
