import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import useDeleteProduct from '../../../../hooks/useDeleteProduct';
import useUpdateProduct from '../../../../hooks/useUpdateProduct';
import UpdateProduct from '../../update-product/UpdateProduct';



const ProductsTable = () => {

    const columns = [
        { field: 'name', headerName: 'Nombre', flex: 0.3 },
        { field: 'brand', headerName: 'Marca', flex: 0.3 },
        { field: 'category', headerName: 'Categoria', flex: 0.3 },
        { field: 'description', headerName: 'Descripcion', flex: 0.3 },
        { field: 'amount', headerName: 'Cantidad', flex: 0.1 },
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
                </Box>
            )
        },
          ];

          const { deleteProduct } = useDeleteProduct()
          const { updateProduct } = useUpdateProduct()
          const handleClickOpen = (item) => {
            setSelectedProduct(item);
            console.log(selectedProduct);
            setOpen(true);
          };
        
          const handleClose = () => {
            setOpen(false);
          };


        const [data, setData] = useState([]);
        const [open, setOpen] = useState(false);
        const [mode, setMode] = useState("delete"); // ["delete", "update"

        const [reload, setReload] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState({});


        const handledeleteProduct = () => {
            
            deleteProduct(selectedProduct.id);
            setOpen(false);
            setReload(!reload);
        }
        const handleUpdateProduct = () => {
            updateProduct(selectedProduct.id);
            setOpen(false);
            setReload(!reload);

        }
        useEffect(
            ()=>{
                axios.get( import.meta.env.VITE_API_URL + 'products/list')
                .then(res=>{
                    const resData = res.data.data.map(e=>{
                        return {
                            id:e._id,
                            name: e.name,
                            brand: e.brand,
                            amount: e.amount,
                            description: e.description,
                            category: e.category
                        }
                    })
                    setData(resData);                
                })
                .catch(err=>{
                    throw err;
                })
            }, [reload]
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
                {mode.toUpperCase() + " Producto"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {mode === "delete" && (
                        <Button onClick={handledeleteProduct} autoFocus>
                            Esta seguro que desea eliminar este producto?
                        </Button>
                    )}
                    {mode === "update" && (
                        <UpdateProduct product={selectedProduct}/>
                    )}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    No
                </Button>
                {mode === "delete" && (
                    <Button onClick={handledeleteProduct} autoFocus>
                        Aceptar
                    </Button>
                )}
                {mode === "update" && (
                    <Button onClick={handleUpdateProduct} autoFocus>
                        Aceptar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
        </>
    );
}
 
export default ProductsTable;