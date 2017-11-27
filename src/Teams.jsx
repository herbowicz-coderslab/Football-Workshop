import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import {IndexLink, Link} from 'react-router';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }

  componentDidMount() {
    console.log('teams cdm', this.props.params.leagueId);
    this.fetchTeams(this.props.params.leagueId);
  }

  componentWillReceiveProps(newProps) {
    console.log('teams cwrp', newProps.params.leagueId);
    this.fetchTeams(newProps.params.leagueId);
  }

  fetchTeams(id) {
    cacheProxy.get(`http://api.football-data.org/v1/competitions/${id}/teams`)
        .then(resp => resp.json())
        .then(resp => {this.setState({teams: resp.teams});
    })
  }

  getPlayersLink(str) {
     const regex = /teams\/(\d+)\/players/g;
     let m;
     m = regex.exec(str);
     if (m[1]) {
       return m[1];
     }
  }

  render() {
    const activeStyle = {
      backgroundColor: 'pink',
      fontWeight: 'bold'
    };
    return (
      <div>
        <div style={{float: 'left', width: '33%'}}>
          <ul className="list">
            <li>
              <IndexLink activeStyle={activeStyle} to="/">BACK</IndexLink>
            </li>

            {this.state.teams.map((el) => {
                return <li key={el.name}>
                    <Link activeStyle={activeStyle} to={'/league' + this.props.params.leagueId + '/team' + this.getPlayersLink(el._links.players.href) }> {this.getPlayersLink(el._links.players.href)} {el.name} </Link>
                  </li>
            })}

            <h5>League ID: {this.props.params.leagueId}</h5>
          </ul>
        </div>
        <div style={{float: 'left', width: '66%'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Teams;
