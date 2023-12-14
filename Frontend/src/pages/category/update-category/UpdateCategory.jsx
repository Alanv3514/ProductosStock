import { TextField, Button } from '@mui/material'
import "./UpdateCategory.css"
import { useState } from 'react'
import axios from 'axios';
const UpdateCategory =  ()=> { // Change component name to UpdateCategory
    const [categoryName, setCategoryName]= useState("");
    const [categoryDescription, setCategoryDescription]= useState("");
    
    const changeName = (e)=>{    
        setCategoryName(e.target.value);
    }
    const changeDescription = (e)=>{    
        setCategoryDescription(e.target.value);
    }

    const submit = ()=>{ 
            
            axios.put( 'http://localhost:3000/api/category/update', // Change POST to PUT
            {        
                name:categoryName, 
                description:categoryDescription
            })
            .then(response => console.log(response));
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
                        >Actualizar Categoria</Button> // Change button label to "Actualizar Categoria"
                </div>
        </div>
        </>
     
    )
}

export default UpdateCategory // Change component name to UpdateCategory
