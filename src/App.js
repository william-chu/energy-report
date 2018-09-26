import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Navigation from './Navigation';
import Report from './Report';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ACUsedArr: [],
      heatUsedArr: [],
      monthReportStart: 1514764800,
      monthDayLength: 31,
    };
  }

  handleMonthChange = (month) => {
    // Unix timestamps, each day is 86400
    const jan2018Start = 1514764800;
    const feb2018Start = 1517443200;
    const mar2018Start = 1519862400;
    const apr2018Start = 1522540800;
    const may2018Start = 1525132800;
    this.setState({ACUsedArr: []});
    this.setState({heatUsedArr: []});
    let newMonthReportStart;
    if (month === 'jan') {
      newMonthReportStart = jan2018Start;
      this.setState({monthDayLength: 31});
    } else if (month === 'feb') {
      newMonthReportStart = feb2018Start;
      this.setState({monthDayLength: 28});
    } else if (month === 'mar') {
      newMonthReportStart = mar2018Start;
      this.setState({monthDayLength: 31});
    } else if (month === 'apr') {
      newMonthReportStart = apr2018Start;
      this.setState({monthDayLength: 30});
    } else {
      newMonthReportStart = may2018Start;
      this.setState({monthDayLength: 31});
    }
    this.setState(
      {
        monthReportStart: newMonthReportStart
      },
      this.darkSkyApi
    );
  }

  darkSkyApi = () => {
    const position = {
      latitude: 45.5898,
      longitude: -122.5951
    };
    const acTemp = 75;
    const heatTemp = 62;
    let darkSkyURL = '';
    for (let i = 0; i < this.state.monthDayLength; i++ ){
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      let dateTimeStamp = this.state.monthReportStart + (i * 86400);
      darkSkyURL = proxy + 'https://api.darksky.net/forecast/' + process.env.REACT_APP_DARK_SKY_API_KEY + '/' + position.latitude + ',' + position.longitude + ',' + dateTimeStamp + "?exclude=currently,minutely,daily,alerts,flag";
      fetch(darkSkyURL)
      .then(results => {
        return results.json();
      })
      .then(data => {
        let newACUsedArr = this.state.ACUsedArr.slice();
        let newHeatUsedArr = this.state.heatUsedArr.slice();
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
        this.setState({heatUsedArr: newHeatUsedArr});
      })
    }
  }

  componentDidMount() {
    this.darkSkyApi();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">HVAC Report</h1>
        </header>
        <Navigation onMonthChange={this.handleMonthChange} />
        <Report ACUsedArr={this.state.ACUsedArr} heatUsedArr={this.state.heatUsedArr} />
      </div>
    );
  }
}

export default App;
