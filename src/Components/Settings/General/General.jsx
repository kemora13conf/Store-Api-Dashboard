import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { motion } from "framer-motion";
import Fetch from "../../utils";
import { toast } from "react-toastify";
import SelectBox from "./../../Global/SelectBox/SelectBox";
import Menu from "../../Global/SelectBox/Menu";
import Option from "../../Global/SelectBox/Option";

function General() {
  const {
    language,
    setActiveTab,
    setLoaded,
    reqFinished,
    selectedLanguage,
    setSelectedLanguage,
    theme,
    setTheme,
  } = useContext(AppContext);
  const [general, setGeneral] = useState({
    // general setting
    // contain theme and language and currency
  });
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [choosedLanguage, setChoosedLanguage] = useState(selectedLanguage);
  const [selectedCurrency, setSelectedCurrency] = useState("dollar");
  const [ saving, setSaving ] = useState(false);

  const saveChanges = () => {
    setSaving(true);
    Fetch(
        import.meta.env.VITE_API + "/settings/general", 
        "PUT",
        JSON.stringify({
          theme: selectedTheme,
          language: choosedLanguage,
          currency: selectedCurrency,
        }),
        { "Content-Type": "application/json" },
    )
      .then((data) => {
        if (data.type == "success") {
          setSaving(false);
          setTheme(selectedTheme);
          setSelectedLanguage(choosedLanguage);
          toast.success(data.message, { theme: selectedTheme });
        } else {
          setSaving(false);
          toast.error(data.message, { theme: theme });
        }
      })
      .catch((err) => {
        setSaving(false);
        toast.error(err.message, { theme: theme });
      });
  };

  useEffect(() => {
    setActiveTab(language.general);
    setLoaded(true);

    Fetch(import.meta.env.VITE_API + "/settings/general")
      .then((data) => {
        if (data.type == "success") {
          setGeneral(data.data);
          setSelectedTheme(data.data.theme);
          setChoosedLanguage(data.data.language);
          setSelectedCurrency(data.data.currency);
        } else toast.error(data.message, { theme: theme });
      })
      .catch((err) => {
        toast.error(err.message, { theme: theme });
      });
  }, [reqFinished, selectedLanguage]);
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0.4, y: -50 }}
      key={"general"}
    >
      <div
        className="
          bg-light-primary-500 dark:bg-dark-primary-800 
          rounded-md shadow 
          flex flex-col
        "
      >
        <div className="w-full mx-auto">
          <div className="w-full flex flex-col rounded-md dark:shadow-dark">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 pb-0">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-light-quarternary-800 dark:text-dark-quarternary-500">
                  {language.general + " " + language.settings}
                </h1>
              </div>
            </div>
            <div
              className="
                w-full max-w-[600px]  
                flex flex-col-reverse justify-between items-start p-4
              "
            >
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-semibold text-light-quarternary-800 dark:text-dark-quarternary-500">
                  {language.currency}
                </h1>
                <div
                  className="
                    text-sm text-light-quarternary-500 dark:text-dark-primary-200
                    flex gap-2 items-center justify-between w-full
                  "
                >
                  {language.choose + " " + language.currency}
                  <SelectBox
                    {...{
                      selected: selectedCurrency,
                      setSelected: setSelectedCurrency,
                      className:
                        "w-[120px] rounded bg-light-secondary-300 dark:bg-dark-primary-700 dark:shadow-dark",
                    }}
                  >
                    <Menu
                      className={`
                          flex flex-col gap-2 py-2 px-2 
                          absolute top-[calc(100%+10px)] right-0 z-index-[2000]
                          bg-light-primary-500 dark:bg-dark-primary-500 rounded shadow-light dark:shadow-dark
                          w-full min-w-[170px] h-auto
                        `}
                    >
                      <Option value={language.dollar}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            {language.dollar}
                          </h1>
                        </div>
                      </Option>
                      <Option value={language.euro}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            {language.euro}
                          </h1>
                        </div>
                      </Option>
                      <Option value={language.dinar}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            {language.dinar}
                          </h1>
                        </div>
                      </Option>
                    </Menu>
                  </SelectBox>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-semibold text-light-quarternary-800 dark:text-dark-quarternary-500">
                  {language.language}
                </h1>
                <div
                  className="
                    text-sm text-light-quarternary-500 dark:text-dark-primary-200
                    flex gap-2 items-center justify-between w-full
                  "
                >
                  {language.choose + " " + language.language}
                  <SelectBox
                    {...{
                      selected: choosedLanguage,
                      setSelected: setChoosedLanguage,
                      className:
                        "w-[120px] rounded bg-light-secondary-300 dark:bg-dark-primary-700 dark:shadow-dark",
                    }}
                  >
                    <Menu
                      className={`
                          flex flex-col gap-2 py-2 px-2 
                          absolute top-[calc(100%+10px)] right-0 z-index-[2000]
                          bg-light-primary-500 dark:bg-dark-primary-500 rounded shadow-light dark:shadow-dark
                          w-full min-w-[170px] h-auto
                        `}
                    >
                      <Option value={"English"}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.english }
                          </h1>
                        </div>
                      </Option>
                      <Option value={"French"}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.french }
                          </h1>
                        </div>
                      </Option>
                      <Option value={"Arabic"}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.arabic }
                          </h1>
                        </div>
                      </Option>
                    </Menu>
                  </SelectBox>
                </div>
              </div>
              <div className="flex flex-col  w-full">
                <h1 className="text-xl font-semibold text-light-quarternary-800 dark:text-dark-quarternary-500">
                  {language.theme}
                </h1>
                <div
                  className="
                    text-sm text-light-quarternary-500 dark:text-dark-primary-200
                    flex gap-2 items-center justify-between w-full
                  "
                >
                  {language.choose + " " + language.theme}
                  <SelectBox
                    {...{
                      selected: selectedTheme,
                      setSelected: setSelectedTheme,
                      className:
                        "w-[120px] rounded bg-light-secondary-300 dark:bg-dark-primary-700 dark:shadow-dark",
                    }}
                  >
                    <Menu
                      className={`
                          flex flex-col gap-2 py-2 px-2 
                          absolute top-[calc(100%+10px)] right-0 z-index-[2000]
                          bg-light-primary-500 dark:bg-dark-primary-500 rounded shadow-light dark:shadow-dark
                          w-full min-w-[170px] h-auto
                        `}
                    >
                      <Option value={"dark"}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            {language.dark}
                          </h1>
                        </div>
                      </Option>
                      <Option value={"light"}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                          <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            {language.light}
                          </h1>
                        </div>
                      </Option>
                    </Menu>
                  </SelectBox>
                </div>
              </div>
            </div>
          </div>
          {/* Save Button */}
          <div className="w-full flex justify-end items-center p-4 max-w-[600px]">
            <button
              onClick={saveChanges}
              className="
                flex justify-center items-center gap-2 
                bg-light-quarternary-500 dark:bg-dark-quarternary-600 
                text-light-primary-500 dark:text-dark-primary-500 
                rounded-md shadow-md
                px-4 py-2
                hover:bg-light-quarternary-800 dark:hover:bg-dark-quarternary-500
                transition duration-200
              "
            >
              <h1 className="text-sm font-semibold flex gap-2 items-center justify-center">
                { saving && (<i className="fas fa-spinner fa-spin"></i>) }
                { saving ? language.saving+"..." : language.save + " " + language.changes }
              </h1>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default General;
