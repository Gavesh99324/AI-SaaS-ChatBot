import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';

const Header = () => {
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Logo />
      <Toolbar sx={{ display: "flex" }}></Toolbar>
    </AppBar>
  )
}

export default Header;


