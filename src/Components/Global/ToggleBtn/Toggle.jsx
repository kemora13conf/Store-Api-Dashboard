import { useState } from "react";
export const Toggle = ({ toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
        className="
            hidden
        "
      />
      <span
        className={`
            w-[45px] h-[25px] rounded-full bg-light-secondary-600 bg-opacity-80 dark:bg-dark-secondary-700   px-[4px]
            flex ${ isToggled ? 'pl-[25px] bg-success dark:bg-success' : 'pl-[4px]' } items-center transition-all duration-300
        `}
      >
        <span
          className="
                w-[17px] h-[17px] rounded-full bg-light-primary-500 dark:bg-light-primary-500
                transition-all duration-300
            "
        />
      </span>
    </label>
  );
};
