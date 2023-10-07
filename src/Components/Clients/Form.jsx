import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import Fetch from '../utils';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PopupsContext } from '../Global/Popups/PopupsContainer';
import SelectBox from '../Global/SelectBox/SelectBox';
import Menu from '../Global/SelectBox/Menu';
import Option from '../Global/SelectBox/Option';

function Form({ id, setReload, setIsFormOpen, setOpenedId }) {
    // get the id param from the url
    const { setActiveTab, setLoaded, reqFinished, language, selectedLanguage, theme } = useContext(AppContext);
    const { setConfirm } = useContext(PopupsContext);

    const [ data, setData ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ form, setForm ] = useState({
        fullname: "",
        email: "",
        phone: "",
        role: "",
        image: "", 
    });

    const [ preview, setPreview ] = useState();
    const [ errors, setErrors ] = useState({});

    const handleDelete = () => {
        setConfirm({
            title: language.delete +' '+ language.category,
            message: language.category_delete_msg,
            confirmText: language.confirm_delete,
            cancelText: language.cancel_delete,
            confirm: (close) => {
                Fetch(import.meta.env.VITE_API+'/clients/'+id, 'DELETE')
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
    
    const handleFile = (e) => {
        const files = e.target.files;
        if(files) {
            setForm(prv => {
                return {
                    ...prv,
                    image: files[0]
                }
            })
            for(var i=0; i<files.length; i++) {
                const file = files[i];
                setPreview(prv => {
                    return URL.createObjectURL(file)
                });
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("fullname", form.fullname);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("role", form.role);
        if(typeof form.image != "string" && form.image != undefined && form.image != null && form.image != "" ) {
            formData.append("image", form.image);
        }
        if(id) {
            Fetch(
                import.meta.env.VITE_API+'/products/'+id,
                "PUT",
                formData
            )
            .then(res => {
                setErrors(prv => {
                    return {
                        ...prv,
                        fullname: "",
                        email: "",
                        phone: "",
                        role: "",
                        image: "",
                    }
                });
                if(res.type != "success") {
                    if(res.type === "error") {
                        toast.error(res.message, { theme: theme });
                        setLoading(false);
                        return;
                    }
                    setErrors(prv => {
                        return {
                            [res.type]: res.message
                        }
                    })
                    setLoading(false);
                    return;
                }
                toast.success(res.message, { theme: theme });
                setData(res.data)
                setLoading(false);
                setReload(prv => !prv);
            })
            .catch(err => {
                toast.error(err.message, { theme: theme });
                setLoading(false);
            })
        } else {
            Fetch(
                import.meta.env.VITE_API+'/clients',
                "POST",
                formData
            )
            .then(res => {
                setErrors(prv => {
                    return {
                        ...prv,
                        fullname: "",
                        email: "",
                        phone: "",
                        role: "",
                        image: "",
                    }
                });
                if(res.type != "success") {
                    if(res.type === "error") {
                        toast.error(res.message, { theme: theme });
                        setLoading(false);
                        return;
                    }
                    setErrors(prv => {
                        return {
                            [res.type]: res.message
                        }
                    })
                    setLoading(false);
                    return;
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

 

    // fetch the data
    useEffect(() => {
        setLoaded(true);
        setActiveTab(language.clients);
        if(id) {
            Fetch(import.meta.env.VITE_API+'/clients/'+id, 'GET')
            .then(res => {
                if(res.type === "error") {
                    toast.error(res.message, { theme: theme });
                    setIsFormOpen(false);
                    setOpenedId(undefined);
                    setLoading(false);
                }
                setData(res.data);
            })
        }
    }
    ,[reqFinished, selectedLanguage]);
    // set the form data
    useEffect(() => {
        if(id && data) {
            setForm(prv => {
                return {
                    ...prv,
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    image: data.image,
                }
            })
            if(typeof data.image == 'string'){
                setPreview(prv => {
                    return import.meta.env.VITE_ASSETS + '/Clients-images/' + data.image
                })
            }else if(typeof data.image == 'object'){
                setPreview(prv => {
                    return import.meta.env.VITE_ASSETS + '/Clients-images/' + data.image[0].name
                })
            }
        }
    },[data]);
    // set the errors
    useEffect(() => {
        setErrors(prv => {
            return {
                ...prv,
                fullname: "",
                email: "",
                phone: "",
                role: "",
                image: "",
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
                    {id ? language.edit+' '+language.client : language.add+' '+language.client}
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
                            htmlFor="fullname" 
                            className="label"
                        >
                            { language.fullname }
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={form.fullname}
                            onChange={handleInput}
                            className={`input ${errors.fullname ? '!border-error' : ''}`}
                        />

                        {
                            errors.fullname && (
                                <p className="error">{errors.fullname}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="email" 
                            className="label">{ language.email }</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleInput}
                            className={`input ${errors.email ? '!border-error' : ''}`}
                        />
                        {
                            errors.email && (
                                <p className="error">{errors.email}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="phone" 
                            className="label">{ language.phone }</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={form.phone}
                            onChange={handleInput}
                            className={`input ${errors.phone ? '!border-error' : ''}`}
                        />
                        {
                            errors.phone && (
                                <p className="error">{errors.phone}</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="role" 
                            className="label">{ language.role }</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={form.role}
                            onChange={handleInput}
                            className={`input ${errors.role ? '!border-error' : ''}`}
                        />
                        {
                            errors.role && (
                                <p className="error">{errors.role}</p>
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
                                    className="label">{ language.image +' '+ language.preview }</label>
                                <div 
                                    className="image-preview"
                                >
                                    {
                                        preview && (
                                            <img 
                                                src={preview}
                                                className="
                                                    w-full h-full rounded-md object-cover
                                                " 
                                            />
                                        )
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
                        <p className=''>{ id ? language.save +' '+ language.client : language.add +' '+ language.new +' '+ language.client }</p>
                    </button>
                </form>
            </div>
        </motion.div>
    )
}


export default Form