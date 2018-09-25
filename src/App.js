import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ACUsedArr: [],
      HeatUsedArr: [],
    };
  }

    componentDidMount() {
      // Unix timestamps, each day is 86400
      const jan2018Start = 1514764800;
      const mar2018Start = 1519862400;
      const may2018Start = 1525132800;
      const monthDayLength = 31;
      const position = {
        latitude: 45.5898,
        longitude: -122.5951
      };
      const acTemp = 75;
      const heatTemp = 62;
      let darkSkyURL = '';
      for (let i = 0; i < monthDayLength; i++ ){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        let dateTimeStamp = jan2018Start + (i * 86400);
        darkSkyURL = proxy + 'https://api.darksky.net/forecast/' + process.env.REACT_APP_DARK_SKY_API_KEY + '/' + position.latitude + ',' + position.longitude + ',' + dateTimeStamp + "?exclude=currently,minutely,daily,alerts,flag";
        fetch(darkSkyURL)
        .then(results => {
          return results.json();
        })
        .then(data => {
          let newACUsedArr = this.state.ACUsedArr.slice();
          let newHeatUsedArr = this.state.HeatUsedArr.slice();
          let acActivated = false;
          let heatActivated = false;
          data.hourly.data.map((hour) => {
            if (hour.temperature > acTemp) {
              return acActivated = true;
            }
            if (hour.temperature < heatTemp) {
              return heatActivated = true;
            }
            return null;
          });
          newACUsedArr.push(acActivated);
          newHeatUsedArr.push(heatActivated);
          this.setState({ACUsedArr: newACUsedArr});
          this.setState({HeatUsedArr: newHeatUsedArr});
        })
      }
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Energy Report</h1>
        </header>
        <p className="App-intro">
          A report to help The Port of Portland determine if PDX Airport HVAC needs replacement
        </p>
      </div>
    );
  }
}

export default App;
