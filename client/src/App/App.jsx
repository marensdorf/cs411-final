import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Matches from '../Matches/Matches.jsx';
import Match from '../Match/Match.jsx';
import Players from '../Players/Players.jsx';
import Player from '../Player/Player.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Matches}/>
          <Route exact path="/matches" component={Matches}/>
          <Route exact path="/matches/:value" component={Match}/>
          <Route exact path="/players" component={Players}/>
          <Route exact path="/players/:value" component={Player}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
