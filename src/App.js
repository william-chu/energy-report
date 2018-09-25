import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      janACUsedArr: [],
      janHeatUsedArr: [],
    };
  }

    componentDidMount() {
      const jan2018Start = 1514764800;
      const janDayLength = 31;
      const position = {
        latitude: 45.5898,
        longitude: -122.5951
      };
      const acTemp = 75;
      const heatTemp = 62;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const darkSkyURL = proxy + 'https://api.darksky.net/forecast/' + process.env.REACT_APP_DARK_SKY_API_KEY + '/' + position.latitude + ',' + position.longitude + ',' + jan2018Start + "?exclude=currently,minutely,daily,alerts,flag";
      fetch(darkSkyURL)
      .then(results => {
        return results.json();
      })
      .then(data => {
        let newJanACUsedArr = this.state.janACUsedArr.slice();
        let newJanHeatUsedArr = this.state.janHeatUsedArr.slice();
        let acActivated = false;
        let heatActivated = false;
        data.hourly.data.map((hour) => {
          if (parseInt(hour.temperature) > acTemp) {
            return acActivated = true;
          } else if (parseInt(hour.temperature) < heatTemp) {
            return heatActivated = true;
          }
            return;
        });
        newJanACUsedArr.push(acActivated);
        newJanHeatUsedArr.push(heatActivated);
        console.log('acusage', newJanACUsedArr);
        console.log('heatusage', newJanHeatUsedArr);
        this.setState({janACUsedArr: newJanACUsedArr});
        this.setState({janHeatUsedArr: newJanHeatUsedArr});
        console.log('state', this.state);
      })
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
