import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "./NewProduct.css"
import useCategory from "../../../hooks/useCategory";
import { useState } from "react";
import useAddProduct from "../../../hooks/useAddProduct";

const NewProducts = () => {
    const categories = useCategory([])
    const [category, setCategory]= useState("");
    const [name, setName]= useState("");
    const [description, setDescription]= useState("");
    const [brand, setBrand]= useState("");
    const [amount, setAmount]= useState("");

    const {addProduct} = useAddProduct();
    
    const changeCategorySelect = (e)=>{        
        setCategory(e.target.value);
    }

    const handleNameChange = (e)=>{
        setName(e.target.value);
    }

    const handleDescriptionChange = (e)=>{
        setDescription(e.target.value);
    }

    const handleBrandChange = (e)=>{
        setBrand(e.target.value);
    }

    const handleAmountChange = (e)=>{
        setAmount(e.target.value);
    }

    const sendForm = ()=>{
        addProduct ({category: category, name: name, description: description, brand: brand, amount: amount})
    }

    return ( 
        <>
            <div className="container flex justify-center">
                <div className="container-form p-10">
                <FormControl fullWidth>
                <InputLabel id="category-select-label">Categoría</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={category}
                        label="Categoría"
                        onChange={changeCategorySelect}                  
                    >
                        {categories?.map(e => {
                            return(
                            <MenuItem key={e.name} value={e.name}>{e.name}</MenuItem>
                        )
                        })}
                        
                    </Select>
                </FormControl>    
            <TextField
             id="product-name"
             label="Nombre Producto" 
             variant="outlined"
             onChange={handleNameChange}
              />
            <TextField 
            id="product-description" 
            label="Descripcion" 
            variant="outlined"
            onChange={handleDescriptionChange}
             />
              <TextField 
            id="product-brand" 
            label="Marca" 
            variant="outlined"
            onChange={handleBrandChange}
             />      
              <TextField 
            id="product-amount" 
            label="Cantidad" 
            variant="outlined"
            onChange={handleAmountChange}
             />
            <Button 
            variant="contained"            
            onClick={sendForm}
            >Agregar Producto</Button>
        </div>
    </div>
        </>
     );
}
 
export default NewProducts;