import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import useDeleteProduct from '../../../../hooks/useDeleteProduct';
import UpdateProduct from '../../update-product/UpdateProduct';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import UpdateStockProduct from '../../stock-product/StockProduct';


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
                    <Tooltip title="Agregar Stock">
                    <IconButton  onClick={()=>{
                            handleClickStock(params.row);
                        }}>
                        <NoteAddOutlinedIcon
                         sx={{fontSize: '1.5rem',} } />
                        </IconButton>
                    </Tooltip>
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
          const [data, setData] = useState([]);
          const [open, setOpen] = useState(false);
          const [mode, setMode] = useState("delete"); 
  
          const [reload, setReload] = useState(false);
          const [selectedProduct, setSelectedProduct] = useState({});

          
          const handleClickOpen = (item) => {
            setSelectedProduct(item);
            setOpen(true);
          };
          
          const handleClickStock = (item) => {
            setMode("stock");
            setSelectedProduct(item);
            setOpen(true);
            };

          const handleClose = () => {
            setReload(!reload);
            setOpen(false);
            //window.location.reload();
          };

          const switchState = () => {
            setReload(!reload);
          }
  
          const handleDeleteProduct = () => {
              deleteProduct(selectedProduct.id);
              handleClose();
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
            }, [reload, open]
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
                        <>¿Estas seguro que deseas eliminar el producto {selectedProduct.name}?</>
                    )}
                    {mode === "update" && (
                        <UpdateProduct product={selectedProduct} funcionEnProps={switchState} funcionClose={handleClose}/>
                    )}
                    {mode === "stock" && (
                        <UpdateStockProduct product={selectedProduct} funcionEnProps={switchState} funcionClose={handleClose} />
                    )}
                </DialogContentText>
            </DialogContent>

            <DialogActions>

                {mode === "delete" && (
                <>
                    <Button autoFocus onClick={handleClose}>
                                    No
                    </Button>
                    <Button onClick={handleDeleteProduct}  autoFocus>
                        Aceptar
                    </Button>
                </>
                )}
            </DialogActions>
        </Dialog>
        </>
    );
}
 
export default ProductsTable;