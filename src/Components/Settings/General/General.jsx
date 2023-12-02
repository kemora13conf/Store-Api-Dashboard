import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../App';
import { motion } from 'framer-motion';

function General() {
    const { language, setActiveTab, setLoaded, reqFinished, selectedLanguage } = useContext(AppContext);

    useEffect(() => {
        setActiveTab(language.general);
        setLoaded(true);
    }, [reqFinished, selectedLanguage])
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0.4, y: -50 }}
      key={'general'}
    >
      <h1>{language.general}</h1>
    </motion.div>
  )
}

export default General