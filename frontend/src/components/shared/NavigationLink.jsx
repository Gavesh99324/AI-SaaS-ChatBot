import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLink = ({ to = "#", bg, textColor, text, onClick }) => {
  return (
    <Link
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

export default NavigationLink;
