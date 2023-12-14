import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "./UpdateProduct.css"
import useCategory from "../../../hooks/useCategory";
import { useEffect, useState, useLayoutEffect } from "react";
import useUpdateProduct from "../../../hooks/useUpdateProduct"; // Import the useUpdateProduct hook
const UpdateProduct = ({product, funcionEnProps,funcionClose}) => {
    const categories = useCategory([]);
    const [category, setCategory]= useState("");
    const [name, setName]= useState("");
    const [description, setDescription]= useState("");
    const [brand, setBrand]= useState("");
    const [amount, setAmount]= useState("");
    const [productId, setProductId] = useState(""); // Create a productId state variable and initialize it with an empty string
    const { updateProduct } = useUpdateProduct(); // Destructure the updateProduct function from the hook
    
    useEffect(() => {
        if(product){
            setCategory(product.category);
            setName(product.name);
            setDescription(product.description);
            setBrand(product.brand);
            setAmount(product.amount);
            setProductId(product.id); // Set the productId state variable with the product id
        }
    }, [])

    useLayoutEffect(() => {
        return () => {
            funcionEnProps();
        };
    }, []);

    const changeCategorySelect = (e) => {        
        setCategory(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

        const sendForm = () => {
            const dataSended = {
                id: productId,
                category: category,
                name: name,
                description: description,
                brand: brand,
                amount: amount
            };
            console.log("dataSemd:" + dataSended.name);
            updateProduct(dataSended);
            funcionClose();

        }

    return ( 
        <>
            <div className="container flex justify-center">
                <div className="container-form p-10">
                <TextField
             id="product-id"
             label={"ID PRODUCTO: "}
             value={productId}
             variant="outlined"
             disabled
              />
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
             value={name}
             variant="outlined"
             onChange={handleNameChange}
              />
            <TextField 
            id="product-description" 
            label="Descripcion" 
            value={description}
            variant="outlined"
            onChange={handleDescriptionChange}
             />
              <TextField 
            id="product-brand" 
            label="Marca" 
            value={brand}
            variant="outlined"
            onChange={handleBrandChange}
             />      
              <TextField 
            id="product-amount" 
            label="Cantidad" 
            value={amount}
            variant="outlined"
            onChange={handleAmountChange}
             />
            <Button 
            variant="contained"            
            onClick={sendForm}
            >Actualizar Producto</Button> {/* Change the button text to "Actualizar Producto" */}
        </div>
    </div>
        </>
     );
}
 
export default UpdateProduct;
