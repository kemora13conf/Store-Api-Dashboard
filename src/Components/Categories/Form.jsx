import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import Fetch from '../utils';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Form({ id }) {
    // get the id param from the url
    const { setActiveTab, setLoaded, reqFinished, language, selectedLanguage } = useContext(AppContext);
    const [ category, setCategory ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ form, setForm ] = useState({
        name: "",
        title: "",
        description: "",
        gallery: "",
        remove: []  
    });
    const [ images, setImages ] = useState([]);
    const [ preview, setPreview ] = useState([]);
    const [ oldImagesPreview, setOldImagesPreview ] = useState([]);
    const [ errors, setErrors ] = useState({});
    const Navigate = useNavigate();

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
                if(file.type !== 'image/png' && file.type !== 'image/jpeg') {
                    setErrors(prv => {
                        return {
                            ...prv,
                            gallery: "Only png and jpeg files are allowed"
                        }
                    })
                }
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
            fetch(import.meta.env.VITE_API+'/categories/update-category/'+id, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                setErrors(prv => {
                    return {
                        ...prv,
                        name: "",
                        title: "",
                        description: "",
                        gallery: ""
                    }
                });
                if(res.type != "success") {
                    setErrors(prv => {
                        return {
                            [res.type]: res.message
                        }
                    })
                    setLoading(false);
                    return;
                }
                toast.success("Category updated successfully");
                setCategory(res.data)
                setLoading(false);

                // reset
                setImages([])
                setPreview([])
            })
            .catch(err => {
                toast.error("Something went wrong");
                setLoading(false);
            })
        } else {
            fetch(import.meta.env.VITE_API+'/categories/create-category', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                toast.success("Category added successfully");
                setLoading(false);
                Navigate('/dashboard/categories');
            })
            .catch(err => {
                toast.error("Something went wrong");
                setLoading(false);
            })
        }
    }
    const handleDelete = () => {
    }

    // fetch the category data
    useEffect(() => {
        setLoaded(true);
        setActiveTab(language.categories);
        if(id) {
            Fetch(import.meta.env.VITE_API+'/categories/'+id, 'GET')
            .then(res => {
                setCategory(res.data);
            })
        }
    }
    ,[reqFinished, selectedLanguage]);
    // set the form data
    useEffect(() => {
        if(id) {
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
                gallery: ""

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
                px-4 max-w-[400px]
                bg-light-primary-500 dark:bg-dark-primary-700
                min-h-screen
            '>
            <div className="flex justify-between items-center w-full py-4">
                <h1 className="
                        text-2xl font-semibold
                        text-light-quarternary-500 dark:text-dark-quarternary-500
                    ">
                    {id ? "Edit category" : "Add a new category"}
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
                                <h1 className="ml-2 text-sm  hidden md:block">Delete</h1>
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
                            Name
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
                            className="label">Title</label>
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
                            className="label">Description</label>
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
                                    className="label">Choose an image</label>
                               {/* nice lookin file import with tailwind css */}
                                <div className="flex gap-2">
                                    <label 
                                        htmlFor="image" 
                                        className="upload-btn ">
                                        <i className="fas fa-upload text-light-primary-500dark-soft"></i>
                                        <p className="ml-2 text-light-primary-500dark-soft">Upload</p>
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
                                    errors.gallery && (
                                        <p className="error">{errors.gallery}</p>
                                    )
                                }
                            </div>
                            <div className="flex gap-2 flex-col">
                                <label 
                                    className="label">Images preview</label>
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
                            <div className="flex gap-2 flex-col">
                                <label
                                    className="label">Old images preview</label>
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
                        <p className=''>{id ? "save category" : "Add a new category"}</p>
                    </button>
                </form>
            </div>
        </motion.div>
    )
}

export default Form