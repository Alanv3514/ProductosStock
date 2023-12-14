import axios from 'axios';

const useAddProduct = () => {
   

    const addProduct = (data) => {    
            axios.post(import.meta.env.VITE_API_URL + 'products/create/',{
                name: data.name, description: data.description, brand: data.brand, category: data.category, amount: data.amount})
            .then(res=>{
                return res.data
            })
            .catch(err=>{
                throw err;
            })
        }    
    
    return { addProduct }
}
 
export default useAddProduct;