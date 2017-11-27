import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import {IndexLink, Link} from 'react-router';

const PlayerInfo = (props) => (
  <div>
    <ul className="list">
      <li>
        <IndexLink to={"/league" + props.params.leagueId + '/team' + props.params.teamId}>BACK</IndexLink>
      </li>
      <li>Name: <strong>{props.name}</strong></li>
      <li>Position: {props.position}</li>
      <li>Jersey number: {props.jerseyNumber}</li>
      <li>Date of birth: {props.dateOfBirth}</li>
      <li>Nationality: {props.nationality}</li>
      <li>Contract until: {props.contractUntil}</li>
      <h5>Player ID: {props.params.playerId}</h5>
    </ul>
  </div>
);

export default PlayerInfo;
