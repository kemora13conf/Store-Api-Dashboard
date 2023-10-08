import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import Fetch from '../utils';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


function Form({ id, setReload, setIsFormOpen, setOpenedId }) {
    // get the id param from the url
    const { setActiveTab, setLoaded, reqFinished, language, selectedLanguage, theme , setConfirm} = useContext(AppContext);

    const [ category, setCategory ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ form, setForm ] = useState({
        name: "",
        title: "",
        description: "",
        file: "",
        remove: []  
    });
    const [ images, setImages ] = useState([]);
    const [ preview, setPreview ] = useState([]);
    const [ oldImagesPreview, setOldImagesPreview ] = useState([]);
    const [ errors, setErrors ] = useState({});

    const handleDelete = () => {
        setConfirm({
            title: language.delete +' '+ language.category,
            message: language.category_delete_msg,
            confirmText: language.confirm_delete,
            cancelText: language.cancel_delete,
            confirm: (close) => {
                Fetch(import.meta.env.VITE_API+'/categories/'+id, 'DELETE')
                .then(res => {
                    if(res.type === "success") {
                        toast.success(res.message, { theme })
                        setReload(prv => !prv)
                        setIsFormOpen(false)
                        setOpenedId(undefined)
                    } else {
                        toast.error(res.message, { theme })
                    }
                    close()
                })
            }
        })
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prv => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const removeImage = (id) => {
        setForm(prv => {
            return {
                ...prv,
                remove: [
                    ...prv.remove,
                    id
                ]
            }
        })
        setOldImagesPreview(prv => {
            return prv.filter(img => img._id !== id)
        })
    }
    const handleFile = (e) => {
        const files = e.target.files;
        if(files) {
            setImages(files);
            for(var i=0; i<files.length; i++) {
                const file = files[i];
                setPreview(prv => {
                    return [
                        ...prv,
                        URL.createObjectURL(file)
                        ]
                });
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("remove", form.remove);
        for(var i=0; i<images.length; i++) {
            formData.append("images", images[i]);
        }
        if(id) {
            Fetch(import.meta.env.VITE_API+'/categories/update/'+id, "PUT", formData)
            .then(res => {
                setErrors(prv => {
                    return {
                        ...prv,
                        name: "",
                        title: "",
                        description: "",
                        file: ""
                    }
                });
                if(res.type != "success") {
                    if(res.type == "error"){
                        setLoading(false);
                        return toast.error(res.message, { theme: theme });
                    }else{
                        setErrors(prv => {
                            return {
                                [res.type]: res.message
                            }
                        })
                        setLoading(false);
                        return;
                    }
                }
                toast.success(res.message, { theme: theme });
                setCategory(res.data)
                setLoading(false);
                setReload(prv => !prv);

                // reset
                setImages([])
                setPreview([])
            })
            .catch(err => {
                toast.error(err.message, { theme: theme });
                setLoading(false);
            })
        } else {
            Fetch(import.meta.env.VITE_API+'/categories/create', "POST", formData)
            .then(res => {
                setErrors(prv => {
                    return {
                        ...prv,
                        name: "",
                        title: "",
                        description: "",
                        file: ""
                    }
                });
                if(res.type != "success") {
                    if(res.type != "success") {
                        if(res.type === "error") {
                            toast.error(res.message, { theme: theme });
                            setLoading(false);
                            return;
                        }else{
                            setErrors(prv => {
                                return {
                                    [res.type]: res.message
                                }
                            })
                            setLoading(false);
                            return;
                        }
                    }
                }
                toast.success(res.message, { theme: theme });
                setLoading(false);
                setReload(prv => !prv);
                setIsFormOpen(false);
            })
            .catch(err => {
                toast.error(err.message, { theme: theme });
                setLoading(false);
            })
        }
    }

    // fetch the category data
    useEffect(() => {
        setLoaded(true);
        setActiveTab(language.categories);
        if(id) {
            Fetch(import.meta.env.VITE_API+'/categories/'+id, 'GET')
            .then(res => {
                if(res.type === "error") {
                    toast.error(res.message, { theme: theme });
                    setIsFormOpen(false);
                    setOpenedId(undefined);
                    setLoading(false);
                }
                setCategory(res.data);
            })
        }
    }
    ,[reqFinished, selectedLanguage]);
    // set the form data
    useEffect(() => {
        if(id && category) {
            setForm(prv => {
                return {
                    ...prv,
                    name: category.name,
                    title: category.title,
                    description: category.description,
                    gallery: category.gallery,
                    remove: []
                }
            })
            setOldImagesPreview(prv => []);
            category.gallery?.map(image => {
                setOldImagesPreview(prv => {
                    return [
                        ...prv,
                        image
                    ]
                })
            })
        }
    }
    ,[category]);
    // set the errors
    useEffect(() => {
        setErrors(prv => {
            return {
                ...prv,
                name: "",
                title: "",
                description: "",
                file: ""

            }
        })
    },[form]);
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: 'linear', duration: 0.2 }}
            exit={{ opacity: 0, x: 300 }}
            key={id}
            className='
                px-4 max-w-[420px] w-full
                bg-light-primary-500 dark:bg-dark-primary-700
                min-h-screen
            '>
            <div className="flex gap-3 justify-between items-center w-full py-4">
                <button
                    onClick={() => {
                        setIsFormOpen(false);
                        setOpenedId(undefined);
                    }}
                    className="
                        w-[40px] h-[40px] rounded-full
                        bg-light-secondary-200 dark:bg-dark-secondary-700
                        text-light-quarternary-500 dark:text-dark-quarternary-500
                        transition-all duration-300
                        hover:bg-light-secondary-500 dark:hover:bg-dark-secondary-600
                    ">
                    <i className="fas fa-arrow-left"></i>
                </button>

                <h1 className="
                        text-2xl font-semibold mr-auto
                        text-light-quarternary-500 dark:text-dark-quarternary-500
                    ">
                    {id ? language.edit+' '+language.category : language.add+' '+language.category}
                </h1>
                {
                    id != undefined ? (
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleDelete} 
                                className="
                                    flex items-center justify-center gap-2 
                                    w-fit h-fit py-2 px-4 
                                    rounded-md shadow-light
                                    border border-error  dark:border-dark-primary-300
                                    text-error dark:text-dark-primary-300
                                    transition-all duration-300 
                                    cursor-pointer 
                                    hover:bg-error dark:hover:bg-dark-primary-500
                                    hover:text-light-secondary-200 
                                    hover:border-transparent dark:hover:border-transparent
                                    focus:scale-90
                                ">
                                <i className="fas fa-trash"></i>
                                <h1 className="ml-2 text-sm  hidden md:block">{ language.delete }</h1>
                            </button>
                        </div>
                    ) : null
                }
            </div>
            <div className="w-full max-w-[1000px] mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="name" 
                            className="label"
                        >
                            { language.name }
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleInput}
                            className={`input ${errors.name ? '!border-error' : ''}`}
                        />

                        {
                            errors.name && (
                                <p className="error">{errors.name}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="title" 
                            className="label">{ language.title }</label>
                        <input

                            type="text"
                            name="title"
                            id="title"
                            value={form.title}
                            onChange={handleInput}
                            className={`input ${errors.title ? '!border-error' : ''}`}
                        />
                        {
                            errors.title && (
                                <p className="error">{errors.title}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="description" 
                            className="label">{ language.description }</label>
                        <textarea
                            name="description"
                            id="description"
                            value={form.description}
                            onChange={handleInput}
                            className={`input ${errors.description ? '!border-error' : ''}`}
                        />
                        {
                            errors.description && (
                                <p className="error">{errors.description}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label 
                                    htmlFor="image" 
                                    className="label">{ language.select +' '+ language.image }</label>
                               {/* nice lookin file import with tailwind css */}
                                <div className="flex gap-2">
                                    <label 
                                        htmlFor="image" 
                                        className="upload-btn ">
                                        <i className="fas fa-upload text-light-primary-500dark-soft"></i>
                                        <p className="ml-2 text-light-primary-500dark-soft">{ language.upload }</p>
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        multiple
                                        onChange={handleFile}
                                        className="hidden"
                                    />
                                </div>

                                {
                                    errors.file && (
                                        <p className="error">{errors.file}</p>
                                    )
                                }
                            </div>
                            <div className="flex gap-2 flex-col">
                                <label 
                                    className="label">{ language.images +' '+ language.preview }</label>
                                <div 
                                    className="images-preview snap-x snap-mandatory snap-center overflow-x-auto"
                                >
                                    {
                                        preview?.map((img, index) => {
                                            return (
                                                <img 
                                                    src={img} 
                                                    key={index} 
                                                    className="
                                                    max-w-[150px] min-w-[100px] h-full rounded-md object-cover
                                                    " 
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                id
                                ? (
                                    <div className="flex gap-2 flex-col">
                                        <label
                                            className="label">{ language.old +' '+ language.images +' '+ language.preview }</label>
                                        <div 
                                            className="images-preview"
                                        >
                                            {
                                                oldImagesPreview?.map((img, index) => {
                                                    return (
                                                        <div 
                                                            key={index} 
                                                            className="
                                                                w-full relative h-full max-w-[150px]
                                                            ">
                                                            <div
                                                                onClick={() => {removeImage(img._id)}}
                                                                className="
                                                                    flex w-[30px] h-[30px] 
                                                                    bg-white rounded-full justify-center items-center 
                                                                    absolute right-2 top-2 cursor-pointer
                                                                ">
                                                                <i className="fas fa-close"></i>
                                                            </div>
                                                            <img 
                                                                src={import.meta.env.VITE_ASSETS + '/Images/' + img.name} 
                                                                key={index} 
                                                                className="
                                                                    w-[150px] h-full rounded-md object-cover
                                                                "
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="
                            submit-btn mb-4
                        ">
                        {
                            loading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : null
                        }
                        <p className=''>{ id ? language.save +' '+ language.category : language.add +' '+ language.new +' '+ language.category }</p>
                    </button>
                </form>
            </div>
        </motion.div>
    )
}

export default Form