import React, { useContext } from 'react'
import { AppContext } from '../../App'
import CheckBox from '../Global/CheckBox/CheckBox';
import { AnimatePresence, motion } from 'framer-motion';
import { Toggle } from '../Global/ToggleBtn/Toggle';
import MyLink from '../Global/MyLink';
import Fetch from '../utils';
import Alert from '../Global/Alert/Alert';
import { toast } from 'react-toastify';
import CategoriesFooter from './CategoriesFooter';

function CategoryTable({
    categories,
    setCategories,
    checkedItems,
    setCheckedItems,
    checkAll,
    setCheckAll,

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
    const { language } = useContext(AppContext);
    console.log('items per page ', itemsPerPage)
    const changeState = (state, id) => {
      Fetch(import.meta.env.VITE_API+'/categories/change-state-category/'+id, 'PUT', { state })
      .then(res => {
        setCategories(prv => {
          return prv.map(category => {
            if(category._id === id) {
              console.log({
                ...category,
                enabled: state
              })
              return {
                ...category,
                enabled: state
              }
            }
            return category;
          })
        })
      })
    }
  
    const deleteCategory = async (id) => {
        Alert({
            title: "Are you sure you want to delete this category ?",
            message: "You won't be able to revert this!",
            icon: "warning",
            buttons: [
                {
                    text: "Yes, delete it!",
                    type: 'primary' 
                },
                {
                    text: "Cancel",
                    type: 'secondary'
                }
            ],
            close: async (closeAlert) => {
                await new Promise((resolve) => {
                    Fetch(import.meta.env.VITE_API+'/categories/delete-category/'+id, 'DELETE')
                    .then(res => {
                        if(res.type == 'success') {
                            toast.success("Category deleted successfully");
                            setCategories(prv => prv.filter(category => category._id !== id));
                        } else {
                            toast.error(res.message);
                        }
                        resolve();
                    })
                    .catch(err => {
                        toast.error("Something went wrong");
                        resolve();
                    })
                    closeAlert();
                })
            }
        })
    }  
  return (
    <div className="w-full rounded-lg overflow-hidden overflow-x-auto gap-3 pb-[150px]">
        <table className="w-full">
          <thead>
            <tr className="
                    text-sm font-semibold text-light-quarternary-500 dark:text-dark-quarternary-500
                    bg-light-secondary-500 dark:bg-dark-primary-700 rounded-lg overflow-hidden
                    shadow 
                    ">
              <th className="px-4 py-5 text-left flex gap-3">
                <CheckBox {...{
                  id: 'checkAll',
                  setCheckAll,
                }} />
                {language.name}
              </th>
              <th className="px-4 py-5 text-left">{language.description}</th>
              <th className="px-4 py-5 text-left">{language.actions}</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-700">
            <AnimatePresence>
              {
                categories?.map((category, index) =>{
                  return (
                    <motion.tr
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      exit={{ opacity: 0, y: -20}}
                      key={index} 
                      className="
                          border-b border-light-secondary-300 dark:border-light-secondary-800 bg-light-secondary-100 dark:bg-dark-primary-600
                          text-light-quarternary-500 dark:text-dark-quarternary-600
                        ">
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <CheckBox {...{
                            id: category._id,
                            checkAll,
                            checkedItems,
                            setCheckedItems,
                          }} />
                          {category.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="line-clamp-1">
                            {category.description}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full h-auto relative flex gap-2 items-center p-2 dark:bg-dark-primary-500 dark:shadow-dark rounded-full">
                          <Toggle
                            toggled={category.enabled}
                            onClick={(state) => changeState(state, category._id)}
                          />
                          <MyLink to={`${category._id}/update`} className="shadow w-8 h-8 flex justify-center items-center rounded-full bg-info text-light-primary-500 hover:bg-opacity-70  transition-all duration-300">
                            <i className="fas fa-pen"></i>
                          </MyLink >
                          <button
                            onClick={() => {deleteCategory(category._id)}} 
                            className="shadow w-8 h-8 flex justify-center items-center rounded-full bg-error text-white hover:bg-opacity-70 transition-all duration-300">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              }
            </AnimatePresence>
          </tbody>
          <CategoriesFooter {...{
            categories,
            setCategories,

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
          }} />
        </table>
    </div>
  )
}

export default CategoryTable