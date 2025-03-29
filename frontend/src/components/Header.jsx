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
     <Toolbar sx={{ display: "flex" }}>
      <Logo />
      <div>
        {auth.isLoggedIn ? (
           <>
             <NavigationLink to="/chat" bg="#F8F8FF" textColor="black" text="Go To Chat" />
             <NavigationLink to="/" bg="#90EE90" textColor="white" text="logout" onClick={auth.logout} />
           </> 
          ) : ( 
            <>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
             <NavigationLink to="/login" bg="#F8F8FF " textColor="black" text="Login" />
             <NavigationLink to="/signup" bg="#90EE90" textColor="white" text="Signup" />
            </> 
            )}
      </div>
     </Toolbar>
    </AppBar>
  )
}

export default Header;


