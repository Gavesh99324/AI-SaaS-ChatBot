import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';

import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

import { motion } from 'framer-motion';


const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
     <Toolbar sx={{ display: "flex" }}>
      <Logo />
      <div>
        {auth.isLoggedIn ? (
           <>
             <NavigationLink to="/chat" bg="#2c2c2c" textColor="white" text="Go To Chat" />
             <NavigationLink to="/" bg="#2c2c2c" textColor="white" text="logout" onClick={auth.logout} />
           </> 
          ) : ( 
            <>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
             <NavigationLink to="/login" bg="#2c2c2c " textColor="white" text="Login" />
             <NavigationLink to="/signup" bg="#2c2c2c" textColor="white" text="Sign Up" />
            </> 
            )}
      </div>
     </Toolbar>
    </AppBar>
  )
}

export default Header;



