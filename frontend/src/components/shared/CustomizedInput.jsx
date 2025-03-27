import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';


const CustomizedInput = ({ name, type, label }) => {
  return (
    <TextField
    sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
    name={name} 
    type={type} 
    label={label} 
    variant="outlined" 
    />
  )
}

CustomizedInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomizedInput;
