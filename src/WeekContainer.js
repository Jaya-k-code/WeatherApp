import React from 'react';
import DayCard from './DayCard';
import { toast } from 'react-toastify';


class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit",
        clippedSearch: 'Seattle'
      }
    
      updateForecastDegree = event => {
        this.setState({
          degreeType: event.target.value
        }, () => console.log(this.state))
      }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} city={this.state.clippedSearch} />)
  }
   

  getUrl=()=>{
   
    console.log('while getting url'+this.state.search)
   return (this.state.search === undefined)
? `http://api.openweathermap.org/data/2.5/forecast?zip=98109&units=imperial&APPID=81dd1fe8069ca1768fd3107228d146ec`
: `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.search}&units=imperial&APPID=81dd1fe8069ca1768fd3107228d146ec`

  }


  componentDidMount = () => {
   
   const weatherURL= this.getUrl()

fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    }).catch(e =>console.log('City name not found'));
    
  }
  

  render() {
    const onChange=(ev) =>{
      this.setState({ search: ev.target.value })
      console.log('search'+this.state.search)
    }
  
   const onSubmit=()=> {
      this.setState({ clippedSearch: this.state.search })
      console.log('Csearch'+this.state.clippedSearch)
      this.componentDidMount()
    } 
  
    return (
      <div className="container">
     <h1 className="display-1 jumbotron">5-Day Weather Forecast</h1>
     <input type="text" style={{marginLeft:450, marginTop:1}} value={this.state.city}  placeholder='Enter city' />
     <button onClick={onSubmit}>Search</button>
     <h7>&nbsp;&nbsp;default : Seattle </h7>

        <div className="row justify-content-center">

          {this.formatDayCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer;