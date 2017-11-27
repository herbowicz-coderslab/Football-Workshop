import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import PlayerInfo from './PlayerInfo.jsx';
import {IndexLink, Link} from 'react-router';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: null,
      position: null,
      jerseyNumber: null,
      dateOfBirth: null,
      nationality: null,
      contractUntil: null
    }
  }

  componentDidMount() {
    console.log('players cdm', this.props.params.teamId);
    this.fetchPlayers(this.props.params.teamId);
  }

  componentWillReceiveProps(newProps) {
    console.log('players cwrp', newProps.params.teamId);
    this.fetchPlayers(newProps.params.teamId);
  }
  
  fetchPlayers(id) {
    cacheProxy.get(`http://api.football-data.org/v1/teams/${id}/players`)
      .then(resp => resp.json()).then(resp => {
        this.setState({data: resp.players})
      });
  }

  handleClick = (event) => {
    this.setState({
      name: this.state.data[event.target.id].name,
      position: this.state.data[event.target.id].position,
      jerseyNumber: this.state.data[event.target.id].jerseyNumber,
      dateOfBirth: this.state.data[event.target.id].dateOfBirth,
      nationality: this.state.data[event.target.id].nationality,
      contractUntil: this.state.data[event.target.id].contractUntil
    });
  }

  render() {
    const activeStyle = {
      backgroundColor: 'pink',
      fontWeight: 'bold'
    };

    const childWithProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        name: this.state.name,
        position: this.state.position,
        jerseyNumber: this.state.jerseyNumber,
        dateOfBirth: this.state.dateOfBirth,
        nationality: this.state.nationality,
        contractUntil: this.state.contractUntil
      });
    });

    return (
      <div>
        <div style={{
          float: 'left',
          width: '50%'
        }}>
          <ul className="list">
            <li>
              <IndexLink to={"/league" + this.props.params.leagueId}>BACK</IndexLink>
            </li>

            {this.state.data.map((el, i) => {
              return <li key={i}>
                <Link id={i} onClick={this.handleClick} activeStyle={activeStyle} to={`/league${this.props.params.leagueId}/team${this.props.params.teamId}/player${i + 1}`}>
                  {i + 1} {el.name}
                </Link>
              </li>

            })}

            <h5>Team ID: {this.props.params.teamId}</h5>
          </ul>
        </div>
        <div style={{
          float: 'left',
          width: '50%'
        }}>
          {childWithProp}
        </div>
      </div>
    )
  }
}

export default Players;
