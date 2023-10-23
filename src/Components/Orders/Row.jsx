import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import CheckBox from "../Global/CheckBox/CheckBox";
import SelectBox from "../Global/SelectBox/SelectBox";
import Menu from "../Global/SelectBox/Menu";
import Option from "../Global/SelectBox/Option";
import { AppContext } from "../../App";

function Row(props) {
  const {
    item,
    index,
    states,
    setData,
    checkedItems,
    setCheckedItems,
    checkAll,
  } = props;
  const { language } = useContext(AppContext);
  console.log(language["Not Processed"]);
  const [selectedState, setSelectedState] = useState(item.status.name);
  const [selectWidth, setSelectWidth] = useState(undefi)
  return (
    <motion.tr
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
      key={index}
      className="
                  border-b border-light-secondary-300 dark:border-light-secondary-800 
                  bg-light-secondary-100 dark:bg-dark-primary-600
                  transition-all duration-300
                  hover:bg-light-secondary-200 dark:hover:bg-dark-primary-500
                  text-light-quarternary-500 dark:text-dark-quarternary-600
                "
    >
      <td className="px-4 py-3">
        <div className="flex gap-4 justify-start items-center">
          <CheckBox
            {...{
              id: item._id,
              checkAll,
              checkedItems,
              setCheckedItems,
            }}
          />
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light-primary-500 dark:bg-dark-primary-500">
            {item.client.image ? (
              <img
                src={
                  import.meta.env.VITE_ASSETS +
                  "/Clients-images/" +
                  item.client.image
                }
                alt={item.fullname}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full flex justify-center items-center text-light-quarternary-500 dark:text-dark-quarternary-500">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <div className="line-clamp-1 whitespace-nowrap text-sm">
            {item.client.fullname}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="line-clamp-1">{item.amount} $</div>
      </td>
      <td className="px-4 py-3">
        <div className="w-full relative">
          <div className="absolute">
            <SelectBox
              {...{
                selected: selectedState,
                setSelected: setSelectedState,
                className: "max-w-fit !rounded-md text-sm",
              }}
            >
              <Menu
                className={` flex flex-col gap-2 py-2 px-2 
              absolute top-[20px] right-0 md:left-0 z-index-[2000]
              bg-light-primary-500 dark:bg-dark-primary-500 rounded-md shadow-lg dark:shadow-dark
              w-full min-w-fit h-auto 
              border border-light-secondary-500 dark:border-dark-secondary-600`}
              >
                {states.map((state) => {
                  return (
                    <Option value={"Fullname"}>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                        <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                          {language[state.name]}
                        </h1>
                      </div>
                    </Option>
                  );
                })}
              </Menu>
            </SelectBox>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="line-clamp-1"></div>
      </td>
    </motion.tr>
  );
}

export default Row;
