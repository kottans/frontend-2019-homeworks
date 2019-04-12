import React from 'react';
import propTypes from 'prop-types'
import './style.css';

import Avatar from '../avatar'

const CharacterInfo = ({ name, image, status, species, gender, type }) => {
  return(
    <div className='character-info'>
      <h4 className='title'>{name}</h4>
      <Avatar src={image} alt={name}/>
      <span><b>Status: </b>{status}</span>
      <span><b>Species: </b>{species}</span>
      <span><b>Gender: </b>{gender}</span>
      {type && <span><b>Type: </b>{type}</span>}
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
