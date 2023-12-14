import  { Fragment, useState } from 'react'
import { Button, TextField, DialogTitle} from "@mui/material"
import axios from "axios"
import './Login.css'
import useAuth from '../../hooks/useAuth'
import {  useNavigate } from "react-router-dom";

const LoginForm = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword]  = useState("");
    const { setAuth } = useAuth();    
    const navigate = useNavigate();
    const onChangeUsername = e =>{
        e.preventDefault();
        setUsername(e.target.value)
    }

    const onChangePassword = e =>{
        e.preventDefault();
        setPassword(e.target.value)
    }

    const onSubmit = e =>{
        e.preventDefault();
        axios.post( import.meta.env.VITE_API_URL +"login",{username: username, password: password})
        .then(response =>{
            console.log(response);
            if(response.data.token){
              sessionStorage.setItem('user', username);
              sessionStorage.setItem('token', response.data.token);
              const token = response.data.token
              setAuth({user:username, token})             
              navigate('list-product')
            }
        })
    }
    return(
        <Fragment className="mx-auto " >
          
            <div className='LoginForm' style={{ maxWidth: "400px", padding: "0 15px" }}>
            <form className="form-signin" onSubmit={onSubmit}>   
            <DialogTitle>Iniciar Sesión</DialogTitle>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="email"
              autoFocus
              onChange={onChangeUsername}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
              value={password}
            />    
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            </form>
            </div>
             
        </Fragment>
    )
}

export default LoginForm
