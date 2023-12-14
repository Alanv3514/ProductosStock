import { TextField, Button } from '@mui/material'
import "./UpdateCategory.css"
import { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
const UpdateCategory =  ({category, funcionEnProps,funcionClose})=> { // Change component name to UpdateCategory
    const [categoryName, setCategoryName]= useState("");
    const [categoryDescription, setCategoryDescription]= useState("");

useEffect(() => {
    if(category){
        setCategoryName(category.name);
        setCategoryDescription(category.description);
    }
}, [])
    useLayoutEffect(() => {
        return () => {
            funcionEnProps();
        };
    }, []);
    const changeName = (e)=>{    
        setCategoryName(e.target.value);
    }
    const changeDescription = (e)=>{    
        setCategoryDescription(e.target.value);
    }

    const submit = ()=>{ 
            
            axios.put( import.meta.env.VITE_API_URL +'category/update', // Change POST to PUT
            {       
                id:categoryName,
                name:categoryName, 
                description:categoryDescription
            })
            .then(response => funcionClose());
    }

    return (
        <>
        <div className="container">
                <div className="container-form">
                        <TextField
                         id="category-name"
                         label="Nombre" 
                         variant="outlined"
                         onChange={changeName} />
                        <TextField 
                        id="category-description" 
                        label="Descripcion" 
                        variant="outlined"
                        onChange={changeDescription} />
                        <Button 
                        variant="contained"
                        onClick={submit}
                        >Actualizar Categoria</Button>
                </div>
        </div>
        </>
     
    )
}

export default UpdateCategory // Change component name to UpdateCategory
