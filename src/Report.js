import React from 'react';
import './Report.css';

function Report(props) {
  let heatUsedCount = props.heatUsedArr.filter(Boolean).length;
  let ACUsedCount = props.ACUsedArr.filter(Boolean).length;
  return (
    <div className="report-container">
      <h2><i className="fal fa-fire"></i> Heat used {heatUsedCount} times this month (below 62 F)</h2>
      <h2><i className="fal fa-snowflake"></i> AC was used {ACUsedCount} times this month (above 75 F)</h2>
      <h2>View By Day:</h2>
      <div className="report-container-grid">
        {props.heatUsedArr.map((item, index) => {
          return (
            <div className="calendar-day" key={index}>
            <h3>{index + 1}</h3>
            <div className="calendar-day-flex">
              {item === true && <i className="fal fa-fire"></i>}
              {props.ACUsedArr[index] === true && <i className="fal fa-snowflake"></i>}
            </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Report;
