import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import {IndexLink, Link} from 'react-router';

class Leagues extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          leagues: []
      }
  }
  componentDidMount() {
      cacheProxy.get('http://api.football-data.org/v1/competitions?season=2017')
      .then(resp => {
          return resp.json()
      }).then(resp => {
          this.setState({leagues: resp})
      });
  }
  render() {
    const activeStyle = {
      backgroundColor: 'pink',
      fontWeight: 'bold'
    };

    return (
      <div>
        <div style={{float: 'left', width: '25%'}}>
          <ul className="list">
            <li>
              <IndexLink activeStyle={activeStyle} to="/">HOME</IndexLink>
            </li>
            {this.state.leagues.map((el) => {
                return <li key={el.id}>
                    <Link activeStyle={activeStyle} to={'/league' + el.id }>{el.id} {el.caption} {el.league} </Link>
                  </li>
            })}
          </ul>
        </div>
        <div style={{float: 'left', width: '75%'}}>
          {this.props.children}
        </div>
      </div>
      );
  }
}

export default Leagues;
