# Energy Report

#### By William Chu

## Objective

Provide a web-based report summarizing a selected month's weather data to help determine if the demands on PDX airport HVAC system needs replacement

Provided Data:

* Airport Location: 45.5898° N, 122.5951° W
  * For API use 45.5898,-122.5951
* AC activated when temp > 75 degrees F
* Heat activated when temp < 62 degrees F

Desired Data:

Transform a month of hourly weather data to calculate how many times the air-conditioning and heating systems were turned on at least once each day.

* Was AC turned on (by day in month range)
* Was heat turned on (by day in month range)

## Setup/Installation Requirements

* To view project code clone repository from https://github.com/william-chu/energy-report
* Install Node.js https://nodejs.org/en/
* Open terminal, navigate to project root folder and run `npm install`
* To bundle and build project distribution folder, run `npm run build`
* To view project in development mode, run `npm start`

## Known Bugs

## Technologies Used

* HTML/CSS
* Create React App
* Dark Sky API

William Chu © 2018
