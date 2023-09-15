import React, { useContext } from "react";
import SelectBox from "../Global/SelectBox/SelectBox";
import Option from "../Global/SelectBox/Option";
import { PaginationContext } from "./Categories";
import { AppContext } from "../../App";
import Menu from "../Global/SelectBox/Menu";

function CategoriesFooter({ categories, setCategories }) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    pages,
    setPages,
    totalItems,
    setTotalItems,
    totalPages,
    setTotalPages,
  } = useContext(PaginationContext);
  const { language } = useContext(AppContext);
  console.log("items per page ", itemsPerPage);
  return (
    <div
      className="
            w-full
            bg-light-secondary-500 dark:bg-dark-primary-600 
        "
    >
      <div className="w-full px-4 py-2">
        <div className="w-full max-w-[100px]">
          <SelectBox
            {...{
              selected: itemsPerPage,
              setSelected: setItemsPerPage,
            }}
          >
            <Menu 
                className={
                    ` flex flex-col gap-2 py-2 px-2 
                    absolute bottom-[calc(100%+10px)] left-0 z-index-[2000]
                    bg-light-primary-500 dark:bg-dark-primary-500 rounded-xl shadow-lg dark:shadow-dark
                    w-full min-w-[100px] h-auto`
                }
            >
                <Option value={10}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                        <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        10
                        </h1>
                    </div>
                </Option>
                <Option value={25}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                        <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        25
                        </h1>
                    </div>
                </Option>
                <Option value={50}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                        <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        50
                        </h1>
                    </div>
                </Option>
                <Option value={100}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                        <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        100
                        </h1>
                    </div>
                </Option>
            </Menu>
          </SelectBox>
        </div>
      </div>
    </div>
  );
}

export default CategoriesFooter;
