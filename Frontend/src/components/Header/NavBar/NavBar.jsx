import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    function samePageLinkNavigation(event) {
        if (
          event.defaultPrevented ||
          event.button !== 0 || // ignore everything but left-click
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey
        ) {
          return false;
        }
        return true;
      }
      
      function LinkTab(props) {
        return (
          <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
                navigate(props.href)
            }}
            {...props}
          />
        );
      }

      

      const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
          event.type !== 'click' ||
          (event.type === 'click' && samePageLinkNavigation(event))
        ) {
          setValue(newValue);
        }
      };
    
      return (
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <LinkTab label="Agregar Producto" href="/new-product" />
            <LinkTab label="Agregar Categoria" href="/new-category" />            
          </Tabs>
        </Box>
      );
}
 
export default NavBar;



