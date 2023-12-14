import {  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AuthContext from '../../../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import UpdateCategory from '../../update-category/UpdateCategory';



const CategoryTable = () => {
    const columns = [
        { field: 'name', headerName: 'Nombre', flex: 0.3 },   
        { field: 'description', headerName: 'Descripcion', flex: 0.3 }, 
        { field: 'actions', headerName: 'Acciones', flex: 0.3,   
        renderCell: (params) =>(
            <Box style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip title="Editar">
                    <IconButton
                    onClick={()=>{
                        setMode("update");
                        handleClickOpen(params.row)
                    }}
                    >
                        <ModeEditOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                    <IconButton
                    onClick={()=>{
                        setMode("delete");
                        handleClickOpen(params.row)}}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>)},
      ];







    const [data, setData] = useState([]);
    const {auth} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("delete"); 
    const [reload, setReload] = useState(false);
    const [selectedCat, setSelectedCat] = useState({});

    const handleClickOpen = (item) => {
        setSelectedCat(item);
        setOpen(true);
      };
      const handleClose = () => {
        setReload(!reload);
        setOpen(false);
        //window.location.reload();
      };
      const handleDeleteCat = () => {
        deleteCat(selectedCat.id);
        handleClose();
    }
    const handleUpdateCat = () => {
        updateCat(selectedCat);
        handleClose();
    }
    const switchState = () => {
        setReload(!reload);
      }
      
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
        <>
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
            
        />
       </Box> 
        

       <Dialog       
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {mode.toUpperCase() + " Categoria"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {mode === "delete" && (
                        <>¿Estas seguro que deseas eliminar el Cato {selectedCat.name}?</>
                    )}
                    {mode === "update" && (
                        <UpdateCategory cat={selectedCat} funcionEnProps={switchState} funcionClose={handleClose}/>
                    )}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {mode === "delete" && (
                <>
                    <Button autoFocus onClick={handleClose}>
                                    No
                    </Button>
                    <Button onClick={handleDeleteCat}  autoFocus>
                        Aceptar
                    </Button>
                </>
                )}
            </DialogActions>
        </Dialog>
        </>



     );
}
 
export default CategoryTable;