import React from 'react';
import propTypes from 'prop-types'
import './style.css';

import Avatar from '../avatar'

function CharacterInfo(props){
  return(
    <div className='character-info'>
      <h2 className='title'>{props.name}</h2>
      <Avatar src={props.image} alt={props.name}/>
      <span>Status: {props.status}</span>
      <span>Species: {props.species}</span>
      <span>Gender: {props.gender}</span>
      {props.type && <span>Type: {props.type}</span>}
    </div>
  )
}

CharacterInfo.propTypes = {
  name: propTypes.string,
  image: propTypes.string,
  status: propTypes.string,
  species: propTypes.string,
  type: propTypes.string,
  gender: propTypes.string,
}

export default CharacterInfo