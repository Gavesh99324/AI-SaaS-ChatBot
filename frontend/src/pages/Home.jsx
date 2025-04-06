
import React from 'react';
import { Box } from '@mui/material';
import TypingAnim from '../components/typer/TypingAnim';
import '../animation/animation.css';

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
        <Box>
          <TypingAnim />

        </Box>
      <div className="animation-body">
        <div className="container">
          {Array.from({ length: 21 }, (_, i) => (
            <div className="circle" key={i} style={{ '--i': i }}></div>
          ))}
        </div>
      </div>

      </Box>
    </Box>
  )
}

export default Home




