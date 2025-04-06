
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypingAnim from '../components/typer/TypingAnim';
import '../animation/animation.css';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box width={"100%"} height={"100%"} >
      <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>

        <Box sx={{ padding: '5px' }}>
          <TypingAnim />
        </Box> 

        <Box mt={6}>
          <Box className="animation-body">
            <div className="container">
              {Array.from({ length: 21 }, (_, i) => (
                <div className="circle" key={i} style={{ '--i': i }}></div>
              ))}
            </div>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default Home;




