import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const theme = createTheme({ 
  typography: { 
    fontFamily: "Work-sans, sans-serif", 
    allVariants: { color: "white"},
    }, 
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
