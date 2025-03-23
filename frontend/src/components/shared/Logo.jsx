import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import chatgpt from '../../assets/chatgpt.png';

const Logo = () => {
  return (
    <div style={{ display: 'flex', marginRight: 'auto', marginTop: '10px', alignItems: 'center', gap: '15px'}}>
      <Link to={"/"}>
       <img src={chatgpt} alt="openai" width={"75px"} height={"45px"} className='image-inverted' />
      </Link>
       <Typography 
           sx={{ 
            display: { md: "block", sm: "none", xs: "none"},
            mr: "auto", fontWeight: "800", 
            textShadow: "2px 2px 2px #000"
            }}>
            <span style={{ fontSize: "20px" }}>MERN</span>-GPT
       </Typography>
    </div>
  );
}; 

export default Logo;




