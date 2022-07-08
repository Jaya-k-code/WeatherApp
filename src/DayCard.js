import React from 'react';
import { useHistory } from "react-router-dom";
import './card.css';

var moment = require('moment');

const DayCard = ({ reading, degreeType, city }) => {

  const history = useHistory();

  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  const tempMax = Math.round(reading.main.temp_max)
  
  const tempMin = Math.round(reading.main.temp_min)
  

  const imgURL = reading.weather[0].icon
  const imageURL =  './icons/' + imgURL + '.png';
  const redirectToHours = () => history.push({
                                            pathname: '/HourContainer',
                                            state: { detail: reading.dt_txt,
                                                      city: city }
                                          });

// Input: 1626750000 ( UTC, unix date)
// Returns: Thursday (Name of Day)
const getDay = (dateString) => {
  const dateUTC = moment.utc(dateString);
 return dateUTC.format('dddd')
}

// Input: 1626750000 ( UTC, unix date)
// Returns: July 20th (Date in format MMM DD )
const getFormattedDate = (dateString) => {
  const dateUTC = moment.utc(dateString);
  return dateUTC.format('MMMM Do')
}

const x = './icons/' + imgURL;
  return (
    <div className="col-sm-2.5" onClick={redirectToHours}>
      <div className="card">
        <h3 className="card-title">{getDay(newDate)}</h3>
        <p className="text-muted">{getFormattedDate(newDate)}</p>
        <img src={imageURL}/>
        <h2>{reading.main.temp}</h2>
        <h7>{ "  "+'High: '+ tempMax + "  "+ 'Low: '+ tempMin}</h7>
        <div className="card-body">
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;