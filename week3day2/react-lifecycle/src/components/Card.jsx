import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {title && <h3 className="text-xl font-semibold text-gray-800">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="text-sm text-gray-500 pt-2 border-t">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default Card;
