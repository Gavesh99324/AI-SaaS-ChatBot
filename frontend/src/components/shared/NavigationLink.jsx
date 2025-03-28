import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const NavigationLink = ({ to = "#", bg, textColor, text, onClick }) => {
  return (
    <Link
    className='nav-link'
      to={to}
      onClick={onClick}
      style={{
        background: bg,
        color: textColor,
        display: 'inline-block',
        padding: '10px 15px',
        borderRadius: '6px',
        margin: '5px',
        textDecoration: 'none',
      }}
    >
      {text}
    </Link>
  );
};

NavigationLink.propTypes = {
  to: PropTypes.string,
  bg: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};


export default NavigationLink;
