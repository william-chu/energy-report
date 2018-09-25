import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ACUsedArr: [],
      heatUsedArr: [],
      monthReportStart: 1514764800,
    };
  }

  handleMonthChange = (month) => {
    const jan2018Start = 1514764800;
    const mar2018Start = 1519862400;
    const may2018Start = 1525132800;
    let newMonthReportStart;
    if (month === 'jan') {
      return newMonthReportStart = jan2018Start;
    } else if (month === 'mar') {
      return newMonthReportStart = mar2018Start;
    } else {
      return newMonthReportStart = may2018Start;
    }
    return this.setState({monthReportStart: newMonthReportStart});
  }

  componentDidMount() {
    // Unix timestamps, each day is 86400
    const monthDayLength = 31;
    const position = {
      latitude: 45.5898,
      longitude: -122.5951
    };
    const acTemp = 75;
    const heatTemp = 62;
    let darkSkyURL = '';
    // for (let i = 0; i < monthDayLength; i++ ){
    //   const proxy = 'https://cors-anywhere.herokuapp.com/';
    //   let dateTimeStamp = this.state.monthReportStart + (i * 86400);
    //   darkSkyURL = proxy + 'https://api.darksky.net/forecast/' + process.env.REACT_APP_DARK_SKY_API_KEY + '/' + position.latitude + ',' + position.longitude + ',' + dateTimeStamp + "?exclude=currently,minutely,daily,alerts,flag";
    //   fetch(darkSkyURL)
    //   .then(results => {
    //     return results.json();
    //   })
    //   .then(data => {
    //     let newACUsedArr = this.state.ACUsedArr.slice();
    //     let newHeatUsedArr = this.state.heatUsedArr.slice();
    //     let acActivated = false;
    //     let heatActivated = false;
    //     data.hourly.data.map((hour) => {
    //       if (hour.temperature > acTemp) {
    //         return acActivated = true;
    //       }
    //       if (hour.temperature < heatTemp) {
    //         return heatActivated = true;
    //       }
    //       return null;
    //     });
    //     newACUsedArr.push(acActivated);
    //     newHeatUsedArr.push(heatActivated);
    //     this.setState({ACUsedArr: newACUsedArr});
    //     this.setState({heatUsedArr: newHeatUsedArr});
    //   })
    // }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Energy Report</h1>
        </header>
        <Navigation onMonthChange={this.handleMonthChange} />
      </div>
    );
  }
}

export default App;
