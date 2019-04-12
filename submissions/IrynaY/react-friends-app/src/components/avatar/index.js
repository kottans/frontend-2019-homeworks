import React from 'react';
import propTypes from 'prop-types'
import './style.css';

const Avatar = ({ src, alt }) => {
  return <img src={src} alt={alt} className='avatar'/>
}

Avatar.propTypes = {
  src: propTypes.string,
  alt: propTypes.string
}

export default Avatar
