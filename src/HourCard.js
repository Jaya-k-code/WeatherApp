import React from 'react';
import './card.css';
import { useHistory } from "react-router-dom";

var moment = require('moment');

const HourCard = ({ reading }) => {

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
                                            state: { detail: reading.dt_txt }
                                          });
const getFormattedDate = (dateString) => {
    const dateUTC = moment.utc(dateString);
    return dateUTC.format('HH' + ':00')
  }

const x = './icons/' + imgURL;
  return (
    <div className="col-sm-1.1" onClick={redirectToHours}>
      <div className="card">
        <p className="text-muted">{getFormattedDate(newDate.getTime())}</p>
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

export default HourCard;