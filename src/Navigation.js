import React from 'react';
import './Navigation.css';

function Navigation(props) {

  function handleMonthChange(month) {
    props.onMonthChange(month);
  }

  return(
    <div className="navigation-container">
      <h1>Click to view 2018 report by month</h1>
      <button onClick={handleMonthChange.bind(this, 'jan')}>Jan</button>
      <button onClick={handleMonthChange.bind(this, 'mar')}>Mar</button>
      <button onClick={handleMonthChange.bind(this, 'may')}>May</button>
    </div>
  );
}

export default Navigation;
