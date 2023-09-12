import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

// highly customizable select box component
const SelectBox = ({ selected, setSelected, tabClassName, children }) => {
    const [opened, setOpened] = useState(false);
    return (
        <div
            onClick={() => {
                setOpened(prv => !prv);
                console.log('opened ', opened)
            }} 
            className={"relative"} >
            <div className={"flex items-center gap-4 bg-light-primary-500 dark:bg-dark-primary-500 rounded-xl py-2 px-3 justify-between cursor-pointer"}>
                <div className="flex items-center justify-center w-fit rounded-md text-light-quarternary-500 dark:text-dark-quarternary-400 text ">
                    {selected}
                </div>
                <div className="flex items-center justify-center w-fit h-fit rounded-full">
                    <i className="fas fa-chevron-down text-sm text-light-quarternary-500 dark:text-dark-quarternary-500"></i>
                </div>
            </div>
            <AnimatePresence mode='wait'>
                {opened && (
                    <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: .3 }}
                    key={selected} 
                    className="
                        flex flex-col gap-2 py-2 px-2 
                        absolute top-[calc(100%+10px)] right-0 z-index-[2000]
                        bg-light-primary-500 dark:bg-dark-primary-500 rounded-xl shadow-lg dark:shadow-dark
                        w-full min-w-[170px] h-auto

                    ">
                    {
                        children
                        ? Array.isArray(children)
                            ? children.map((childp, i) => {
                                let child = childp.props.children
                                return (
                                    <child.type 
                                        key={i}
                                        {...child.props}
                                        onClick={() => {
                                            setSelected(childp.props.value);
                                        }}
                                        className={ child.props.className + (selected == childp.props.value ? ' selected-language' : '') }  
                                    />
                                )
                            })
                            :  (
                                <children.type 
                                    {...children.props}
                                    onClick={() => {
                                        setSelected(childp.props.value);
                                    }}
                                    className={ children.props.className + (selected == children.props.value ? ' selected-language' : '') }  
                                />
                            )
                        
                        : null
                    }
                </motion.div>)}
            </AnimatePresence>
        </div>
    )
}

export default SelectBox;