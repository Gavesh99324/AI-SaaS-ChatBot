
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import HeaderLogo from '../../assets/Logo.png';

const Logo = () => {
  return (
    <div style={{ display: 'flex', marginRight: 'auto', marginTop: '10px', alignItems: 'center', gap: '15px' }}>
      <Link to={"/"} style={{ display: 'flex', alignItems: 'center' }}>
       
        <svg className="logo-animation" width="75px" height="75px" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <g className="outer-circuits">
            <circle cx="100" cy="100" r="80" stroke="url(#gradient)" strokeWidth="2" fill="none" />
            <circle cx="25" cy="100" r="5" fill="url(#gradient)" />
            <circle cx="175" cy="100" r="5" fill="url(#gradient)" />
            <circle cx="100" cy="25" r="5" fill="url(#gradient)" />
            <circle cx="100" cy="175" r="5" fill="url(#gradient)" />
          </g>

          
          <image href={HeaderLogo} x="50" y="50" width="100px" height="100px" clipPath="url(#circleClip)" />

          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF0080" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#00FFFF" />
            </linearGradient>
            <clipPath id="circleClip">
              <circle cx="100" cy="100" r="50" />
            </clipPath>
          </defs>
        </svg>
      </Link>

      
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto", fontWeight: "800",
          textShadow: "2px 2px 2px #000"
        }}>
        <span style={{ fontSize: "24px" }}>NeuraBot</span>
      </Typography>
    </div>
  );
};

export default Logo;
