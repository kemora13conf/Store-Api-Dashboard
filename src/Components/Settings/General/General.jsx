import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../App';

function General() {
    const { language, setActiveTab, setLoaded, reqFinished, selectedLanguage } = useContext(AppContext);

    useEffect(() => {
        setActiveTab(language.general);
        setLoaded(true);
    }, [reqFinished, selectedLanguage])
  return (
    <div>General</div>
  )
}

export default General