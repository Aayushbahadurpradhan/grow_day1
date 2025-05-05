import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition';

  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
};

export default Button;
