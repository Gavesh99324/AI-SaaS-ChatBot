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
    slotProps={{
      input: {
        style: {
          width: "300px",
          borderRadius: "10px",
          fontSize: 20,
          color: 'white'
        }
      }
    }}
    />
  )
}

CustomizedInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomizedInput;
