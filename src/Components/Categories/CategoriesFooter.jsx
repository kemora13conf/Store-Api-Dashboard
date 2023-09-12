import React from 'react'
import SelectBox from '../Global/SelectBox/SelectBox'
import Option from '../Global/SelectBox/Option'

function CategoriesFooter({
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    pages,
    setPages,
    totalItems,
    setTotalItems,
    totalPages,
    setTotalPages
}) {

    console.log('items per page ', itemsPerPage)
  return (
    <tfoot 
        className="
            w-full
            bg-light-secondary-500 dark:bg-dark-primary-600 
        ">
            <td colSpan={3}>
                <div className="w-full px-4 py-2">
                    <div className="w-full max-w-[150px] ml-auto">
                        <SelectBox {...{
                            selected: itemsPerPage,
                            setSelected: setItemsPerPage,
                        }}>
                            <Option value={10} >
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                                    <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">10</h1>
                                </div>
                            </Option>
                            <Option value={50} >
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                                    <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">50</h1>
                                </div>
                            </Option>
                        </SelectBox>
                    </div>
                </div>
            </td>
    </tfoot>
  )
}

export default CategoriesFooter