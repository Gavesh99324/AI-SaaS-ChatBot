import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';

import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Logo />
      <div>
        {auth.isLoggedIn ? (
           <>
             <NavigationLink to="/chat" bg="#00fffc" textColor="black" text="Go To Chat" />
             <NavigationLink to="/" bg="#51538f" textColor="white" text="logout" onClick={auth.logout} />
           </> 
          ) : ( 
            <>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
             <NavigationLink to="/login" bg="#00fffc" textColor="black" text="Login" />
             <NavigationLink to="/signup" bg="#51538f" textColor="white" text="Signup" />
            </> 
            )}
      </div>
      <Toolbar sx={{ display: "flex" }}></Toolbar>
    </AppBar>
  )
}

export default Header;


