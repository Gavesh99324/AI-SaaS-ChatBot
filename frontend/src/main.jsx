import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';


const theme = createTheme({ 
  typography: { 
    fontFamily: "Work-sans, sans-serif", 
    allVariants: { color: "white"},
    }, 
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ThemeProvider theme={theme}>
      <App />
     </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)

