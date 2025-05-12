import React, { useState } from 'react';

const ViewToggle = ({ onViewChange }) => {
  const [view, setView] = useState('week');

  const toggleView = () => {
    const newView = view === 'week' ? 'day' : 'week';
    setView(newView);
    onViewChange(newView);
  };

  return <button onClick={toggleView}>Switch to {view === 'week' ? 'Day' : 'Week'} View</button>;
};

export default ViewToggle;
