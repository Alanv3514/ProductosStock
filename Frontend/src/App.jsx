import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css'
import NewCategory from './pages/category/new-category/NewCategory';
import NewProducts from './pages/product/new-product/NewProduct';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ListProducts from './pages/product/list-product/ListProducts';
import SideBar from './components/SideBar/SideBar';
import ListCategory from './pages/category/list-category/ListCategory';
import Login from './components/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';

const App = ()=> {
const { pathname } = useLocation();
  return (
    <>
    <div className="container flex-col items-center">
          {pathname !== "/" && (
        <section id="Header" className='w-screen flex-col static'>
          <Header />
        </section>
      )}
     <div className="flex justify-center items-center">
     {pathname !== "/" && (
        <section id="SideBar" className='flex flex-shrink-0 w-52 justify-center items-center'>
          <SideBar/>
        </section>
      )}
     <section id="Main" className='flex-col grow justify-center items-center'>
        <Routes>
              <Route path='/' element={<Login/>} />              
              <Route element={<RequireAuth/>}>
               <Route path='new-category' element={< NewCategory />} />
                <Route path='list-category' element={< ListCategory />} />
                <Route path='new-product' element={< NewProducts />} />
                <Route path='list-product' element={<ListProducts/>} />
              </Route>
          </Routes>  
      </section>
     </div>
     
      <section id="Footer" className='flex'>
      <Footer/>
        </section>
      
    </div>
    </>
  )
}
export default App