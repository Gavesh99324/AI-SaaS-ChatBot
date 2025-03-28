import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true; 


const theme = createTheme({ 
  typography: { 
    fontFamily: "Work-sans, sans-serif", 
    allVariants: { color: "white"},
    }, 
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <BrowserRouter>
     <ThemeProvider theme={theme}>
      <Toaster position='top-right' />
      <App />
     </ThemeProvider>
    </BrowserRouter>
   </AuthProvider>
  </StrictMode>
)

