import React from 'react';
import propTypes from 'prop-types'

import './style.css';

function Avatar(props){
  return (
    <img
      src={props.src}
      alt={props.name}
      className='avatar'
    />
  )
}

Avatar.propTypes = {
  src: propTypes.string,
  alt: propTypes.string
}

export default Avatar