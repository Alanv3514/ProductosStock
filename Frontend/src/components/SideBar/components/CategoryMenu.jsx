import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
const CategoryMenu = () => {
    const navigate = useNavigate();
    const handleClickAddCategory = () => {
        navigate('new-category');
    }

    const handleClickListCategory = () => {
        navigate('list-category');
    }
    return ( 
        <List>
            <ListItem disablePadding >
                <ListItemButton className="flex-row" 
                onClick={handleClickAddCategory}
                >
                    <ListItemIcon className="justify-center min-w-min">
                    <NoteAddOutlinedIcon  sx={{fontSize: '1.5rem',}} />
                    </ListItemIcon>
                    <ListItemText primary="Agregar Categoria" sx={{fontSize: 13}}/>
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding >
                <ListItemButton className="flex-row" 
                onClick={handleClickListCategory}
                >
                    <ListItemIcon className="justify-center min-w-min">
                    <NoteAddOutlinedIcon  sx={{fontSize: '1.5rem',}} />
                    </ListItemIcon>
                    <ListItemText primary="Listar Categorias" sx={{fontSize: 13}}/>
                </ListItemButton>
            </ListItem>
        </List>
     );
}
 
export default CategoryMenu;