import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, HashRouter, Switch} from 'react-router-dom';
import WeekContainer from './WeekContainer';
import HourContainer from './HourContainer';

class App extends Component {
  render() {
    return(
        <HashRouter>
            <div>
                
                <div className='content'>
                    <Switch>
                    <Route exact path="/" component={WeekContainer} />
                    <Route path="/HourContainer" component={HourContainer} />
                    </Switch>
                    
                </div>
                
            </div>
        </HashRouter>

    )
}
}


export default App;