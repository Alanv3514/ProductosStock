import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
const useCategory = () => {
    const [data, setData] = useState();
    const {auth} = useContext(AuthContext)
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL +'category/list',{ headers: {
                "Authorization": `Bearer ${auth.token}`}})
            .then(res=>{
                setData(res.data.data);
            })
            .catch(err=>{
                throw err;
            })
        }, []
    );
    return data;
}
 
export default useCategory;