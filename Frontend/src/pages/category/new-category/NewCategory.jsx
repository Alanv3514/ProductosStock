import { TextField, Button } from '@mui/material'
import "./NewCategory.css"
import { useState } from 'react'
import axios from 'axios';
const NewCategory =  ()=> {
  const [categoryName, setCategoryName]= useState("");
  const [categoryDescription, setCategoryDescription]= useState("");
  
  const changeName = (e)=>{    
    setCategoryName(e.target.value);
  }
  const changeDescription = (e)=>{    
    setCategoryDescription(e.target.value);
  }

  const submit = ()=>{ 
      
      axios.post( import.meta.env.VITE_API_URL +'category/create',
      {        
        name:categoryName, 
        description:categoryDescription
      })
      .then(response => console.log(response));
  }

  return (
    <>
    <div className="container flex justify-center">
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
            >Agregar Categoria</Button>
        </div>
    </div>
    </>
   
  )
}

export default NewCategory