import axios from 'axios';

const useUpdateProduct = () => {
   

    const updateProduct = (data) => {    
            axios.put(import.meta.env.VITE_API_URL + 'products/update/',{
                id:data.id, name: data.name, description: data.description, brand: data.brand, category: data.category, amount: data.amount})
            .then(res=>{
                return res.data
            })
            .catch(err=>{
                throw err;
            })
        }    
    
    return { updateProduct }
}
 
export default useUpdateProduct;