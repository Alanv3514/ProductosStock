import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
const ProductsMenu = () => {
    const navigate = useNavigate();
    const handleClickAddPRoduct = () => {
        navigate('new-product');
    }

    const handleClickListProducts = () => {
        navigate('list-product');
    }
    return ( 
        <List>
            <ListItem disablePadding >
                <ListItemButton className="flex-row" 
                onClick={handleClickAddPRoduct}
                >
                    <ListItemIcon className="justify-center min-w-min">
                    <NoteAddOutlinedIcon  sx={{fontSize: '1.5rem',}} />
                    </ListItemIcon>
                    <ListItemText primary="Agregar Producto" sx={{fontSize: 13}}/>
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding >
                <ListItemButton className="flex-row" 
                onClick={handleClickListProducts}
                >
                    <ListItemIcon className="justify-center min-w-min">
                    <NoteAddOutlinedIcon  sx={{fontSize: '1.5rem',}} />
                    </ListItemIcon>
                    <ListItemText primary="Listar Productos" sx={{fontSize: 13}}/>
                </ListItemButton>
            </ListItem>
        </List>
     );
}
 
export default ProductsMenu;