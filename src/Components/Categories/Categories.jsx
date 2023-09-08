import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import Fetch from '../utils';
import { Toggle } from '../Global/ToggleBtn/Toggle';
import { motion, AnimatePresence } from 'framer-motion';
import MyLink from '../Global/MyLink';
import Alert from '../Global/Alert/Alert';
import { toast } from 'react-toastify';


function Categories() {
    const { setActiveTab, setLoaded, reqFinished, setReqFinished, language, selectedLanguage } = useContext(AppContext);
    const [ categories, setCategories ] = useState([]);

    const changeState = (state, id) => {
      console.log("Category: ", id,"Toggled: ", state)
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


    useEffect(() => {
        setActiveTab(language.categories);
        Fetch(import.meta.env.VITE_API+'/categories', 'GET')
        .then(res => {
          setCategories(res.data);
          setReqFinished(true);
        })
    },[]);

    useEffect(() => {
      setActiveTab(language.categories);
      setLoaded(true);
    }, [reqFinished, selectedLanguage]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-primary-500 dark:text-light-primary-500">{language.categories}</h1>
        <MyLink to="/categories/add" className="flex items-center justify-center px-4 py-2 rounded-md bg-rose-600 text-white dark:bg-rose-500 dark:text-white hover:bg-rose-500 dark:hover:bg-rose-400 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {language.addCategory}
        </MyLink>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between px-4 py-2 bg-light-secondary-500 dark:bg-dark-primary-500 rounded-md">
          <p className="text-sm font-medium text-dark-primary-500 dark:text-light-primary-500">{language.categories}</p>
          <p className="text-sm font-medium text-dark-primary-500 dark:text-light-primary-500">{language.status}</p>
          <p className="text-sm font-medium text-dark-primary-500 dark:text-light-primary-500">{language.actions}</p>
        </div>
        <div className="mt-2">
          {
            categories.map(category => (
              <div key={category._id} className="flex items-center justify-between px-4 py-2 bg-light-secondary-500 dark:bg-dark-primary-500 rounded-md mt-2">
                <p className="text-sm font-medium text-dark-primary-500 dark:text-light-primary-500">{category.name}</p>
                <Toggle state={category.enabled} onChange={(state) => changeState(state, category._id)} />
                <div className="flex items-center gap-2">
                  <MyLink to={`/categories/edit/${category._id}`} className="flex items-center justify-center px-2 py-1 rounded-md bg-tertiary text-white dark:bg-tertiary dark:text-white hover:bg-secondary dark:hover:bg-secondary transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    </svg>
                    {language.edit}
                  </MyLink>
                  <button onClick={() => deleteCategory(category._id)} className="flex items-center justify-center px-2 py-1 rounded-md bg-rose-600 text-white dark:bg-rose-500 dark:text-white hover:bg-rose-500 dark:hover:bg-rose-400 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    </svg>
                    {language.delete}

                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    
  )
}

export default Categories