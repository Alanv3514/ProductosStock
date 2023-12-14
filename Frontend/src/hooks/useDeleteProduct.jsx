import axios from 'axios';
import {  useState } from 'react';

const useDeleteProduct = () => {
   

    const deleteProduct = (id) => {    
            axios.delete('http://localhost:3000/api/products/delete/' + id )
            .then(res=>{
                return res.data.message
            })
            .catch(err=>{
                throw err;
            })
        }    
    
    return { deleteProduct }
}
 
export default useDeleteProduct;