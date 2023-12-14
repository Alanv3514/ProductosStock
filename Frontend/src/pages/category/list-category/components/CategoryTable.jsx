import { Box } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AuthContext from '../../../../context/AuthContext';
const columns = [
    { field: 'name', headerName: 'Nombre', flex: 0.3 },   
    { field: 'description', headerName: 'Descripcion', flex: 0.3 },    
   
  ];

const CategoryTable = () => {
    const [data, setData] = useState([]);
    const {auth} = useContext(AuthContext);
    useEffect(
        ()=>{
            axios.get( import.meta.env.VITE_API_URL + 'category/list',{ headers: {
                "Authorization": `Bearer ${auth.token}`}})
            .then(res=>{
                const resData = res.data.data.map(e=>{
                    return {
                        id:e._id,
                        name: e.name,                     
                        description: e.description,                        
                    }
                })
                setData(resData);
                console.log(resData);                
            })
            .catch(err=>{
                throw err;
            })
        }, []
    );
    return ( 
        <Box  sx={{ width: '80%', padding:'20px' }}>
            <DataGrid
            rows={data}
            loading={!data}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
       </Box> 
     );
}
 
export default CategoryTable;