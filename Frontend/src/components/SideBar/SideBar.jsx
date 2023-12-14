import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { Collapse } from '@mui/material';
import ProductsMenu from './components/ProductsMenu';
import CategoryMenu from './components/CategoryMenu';



const SideBar = ()=> {  
  const [productsMenu, setProductsMenu] = useState(false)
  const [categoryMenu, setCategoryMenu] = useState(false)

  const openProductsMenu = ()=>{
    setProductsMenu(!productsMenu);
  }

  const openCategoryMenu = ()=>{
    setCategoryMenu(!categoryMenu);
  }


  return (
    <>
    <div id='SideBar' className='min-h-screen z-[90] shadow-md w-52'>
    <Box sx={{width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>      
        <List>
          <ListItem disablePadding className="flex-col w-full" >
            <ListItemButton className="flex-col w-full" onClick={openProductsMenu}>
              <ListItemIcon className="justify-center">
                <Inventory2OutlinedIcon className="hover:fill-[#3223f4]" sx={{fontSize: '2rem',}} />
              </ListItemIcon>
              <ListItemText primary="Productos" />
              {productsMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={productsMenu} timeout="auto" unmountOnExit>
              <ProductsMenu/>
            </Collapse>
          </ListItem>
          
          <Divider /> 
          <ListItem disablePadding className="flex-col w-full">
            <ListItemButton className="flex-col w-full" onClick={openCategoryMenu}>
              <ListItemIcon className="justify-center">
                <ClassOutlinedIcon className="hover:fill-[#3223f4]" sx={{fontSize: '2rem',}} />
              </ListItemIcon>
              <ListItemText primary="Categorias" />
              {categoryMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={categoryMenu} timeout="auto" unmountOnExit>
              <CategoryMenu/>
            </Collapse>
          </ListItem>
          <Divider />

        </List>
    </Box>  
    </div>    
      </>
  );
}

export default SideBar