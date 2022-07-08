import React from 'react';
import HourCard from './HourCard';

var moment = require('moment');
class HourContainer extends React.Component {


  state = {
    fullData: [],
    dayData: [],
    degreeType: "fahrenheit",
    selectedDate: ''
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(''))
  }
  formatHourCards = () => {
    return this.state.dayData.map((reading, index) => <HourCard reading={reading} key={index} />)
  }
  getUrl=()=>{
   
    console.log('while getting url'+this.state.search)
   return (this.state.search === undefined)
? `http://api.openweathermap.org/data/2.5/forecast?zip=98109&units=imperial&APPID=81dd1fe8069ca1768fd3107228d146ec`
: `http://api.openweathermap.org/data/2.5/forecast?q=${this.props.location.state.city}&units=imperial&APPID=81dd1fe8069ca1768fd3107228d146ec`

  }
  
  componentDidMount = () => {
    const weatherURL = this.getUrl();
     

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const selectedDate = (this.props.location.state === undefined)
          ? ''
          : this.props.location.state.detail.split(' ')[0];
        console.log(selectedDate)
        const dayData = data.list.filter(reading => reading.dt_txt.includes(selectedDate))
        this.setState({
          fullData: data.list,
          dayData: dayData,
          selectedDate: selectedDate
        }, () => console.log(dayData))
      })
  }



  render() {
    
    // Input: 1626750000 ( UTC, unix date)
    // Returns: July 20th (Date in format MMM DD )
    const getFormattedDate = (dateString) => {
      console.log(this.props.location.state.city)
      const dateUTC = moment.utc(dateString);
      return dateUTC.format('MMMM Do')
    }

    return (
      (this.props.location.state === undefined || this.props.location.state.city===undefined)
        ? <div><h4>Please select the day first on first page</h4><a href='/'>GoBack</a></div>
        : (<div className="container">
          <h1 className="display-4 jumbotron"> Hourly Forecast -- {getFormattedDate(this.state.selectedDate)} --[{this.props.location.state.city}]</h1>
       
          <div className="row justify-content-center">
            <div > {this.state.detail}</div>
            {this.formatHourCards()}

          </div>
        </div>)

    )
  }
}

export default HourContainer;