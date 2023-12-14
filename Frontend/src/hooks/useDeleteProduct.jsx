import axios from 'axios';

const useDeleteProduct = () => {
   

    const deleteProduct = (id) => {    
        console.log("deleteo esto:"+id);
            axios.delete(import.meta.env.VITE_API_URL+'products/delete/' + id )
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