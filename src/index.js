import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import Leagues from './Leagues';
import Teams from './Teams';
import Players from './Players';
import PlayerInfo from './PlayerInfo';
import {
  Router,
  Route,
  Link,
  IndexLink,
  IndexRoute,
  hashHistory
} from 'react-router';

class NotFound extends React.Component {
  render() {
    return <div>
      <h1>404</h1>
    </div>;
  }
}
class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Leagues}>
          <Route path='/league:leagueId' component={Teams}>
            <Route path='/league:leagueId/team:teamId' component={Players}>
              <Route path='/league:leagueId/team:teamId/player:playerId' component={PlayerInfo}  />
            </Route>
          </Route>
        </Route>
        <Route path='*' component={NotFound}/>
      </Router>
    );
  }
}
ReactDOM.render(
  <App/ >, document.getElementById('app')
  );

module.hot.accept();
