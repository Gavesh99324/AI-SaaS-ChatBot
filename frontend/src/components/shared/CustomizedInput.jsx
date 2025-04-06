
import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CustomizedInput = ({ name, type, label }) => {
  return (
    <TextField
      sx={{
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#05101c', 
          '&:hover': {
            backgroundColor: '#05101c', 
          },
          '&.Mui-focused': {
            backgroundColor: '#05101c', 
          },
        },
        marginBottom: '20px',
      }}
      name={name}
      type={type}
      label={label}
      variant="outlined"
      slotProps={{
        input: {
          style: {
            width: "300px",
            borderRadius: "8px",
            fontSize: 15,
            color: 'white',
          }
        }
      }}
    />
  );
}

CustomizedInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomizedInput;
