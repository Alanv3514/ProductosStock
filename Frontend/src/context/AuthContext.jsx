import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token'); 
        if(user && token){
            setAuth({user, token})
        }
      
    }, [])
    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;