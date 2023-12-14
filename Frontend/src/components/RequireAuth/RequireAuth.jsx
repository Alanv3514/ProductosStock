import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();    
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        
    return (        
        auth?.user || user  
                ? <Outlet />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;


