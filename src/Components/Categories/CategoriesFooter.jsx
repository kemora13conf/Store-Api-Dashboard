import React, { useContext } from "react";
import SelectBox from "../Global/SelectBox/SelectBox";
import Option from "../Global/SelectBox/Option";
import { PaginationContext } from "./Categories";
import { AppContext } from "../../App";
import Menu from "../Global/SelectBox/Menu";

function CategoriesFooter() {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    setTotalPages,
  } = useContext(PaginationContext);
  const { language } = useContext(AppContext);
  console.log("items per page ", itemsPerPage);
  return (
    <div
      className="
            w-full rounded-b-md
            bg-light-secondary-500 dark:bg-dark-primary-700 
        "
    >
      <div className="w-full px-4 py-2 flex gap-4">
        {/* Items per pages */}
        <div className="w-full max-h-fit mb-auto max-w-[100px] border border-light-secondary-600 dark:border-dark-secondary-600 rounded-xl">
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
                    w-full min-w-[100px] h-auto dark:border dark:border-dark-secondary-600`
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
        
        {/* current page */}
        <div className="
                flex items-center justify-center w-fit max-w-[100px] rounded-md 
                text-light-quarternary-500 dark:text-dark-quarternary-500 text 
                mr-auto
              ">
          {currentPage} / {totalPages}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center">
          <div
            className="
                flex items-center justify-center rounded-l-md cursor-pointer
                w-[40px] h-[35px] 
                bg-light-primary-500 border border-light-secondary-600 border-r-0
                dark:bg-dark-primary-500 dark:border-dark-secondary-600 dark:border-r-0
                text-light-quarternary-500 dark:text-dark-quarternary-500
                transition-all duration-300 hover:bg-light-secondary-600  dark:hover:bg-dark-secondary-600
                group
              "
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prv) => prv - 1);
              }
            }}
          >
            <i className="fas fa-chevron-left transition-all duration-300 group-hover:scale-110"></i>
          </div>
          <div className="
                  flex items-center justify-center
                  text-light-quarternary-500 dark:text-dark-quarternary-500 text 
                  w-[35px] h-[35px]
                  border border-light-secondary-600 dark:border-dark-secondary-600
                ">
            {currentPage}
          </div>
          <div
            className="
                flex items-center justify-center rounded-r-md cursor-pointer
                w-[40px] h-[35px] 
                bg-light-primary-500 border border-light-secondary-600 border-l-0
                dark:bg-dark-primary-500 dark:border-dark-secondary-600 dark:border-r-0
                text-light-quarternary-500 dark:text-dark-quarternary-500
                transition-all duration-300 hover:bg-light-secondary-600  dark:hover:bg-dark-secondary-600
                group
              "
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage((prv) => prv + 1);
              }
            }}
          >
            <i className="fas fa-chevron-right transition-all duration-300 group-hover:scale-110"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesFooter;
