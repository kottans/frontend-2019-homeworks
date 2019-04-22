import React from 'react';
import { Spring } from 'react-spring/renderprops';

const UserCards = item => (
  <Spring
    from={{ transform: 'scale(0)' }}
    to={{ transform: 'scale(1)' }}
    enter={{ opacity: 0 }}
    leave={{ opacity: 1 }}
    config={{ duration: 200, delay: 200 }}
  >
    {props => (
      <div key={item.id} className='user' style={props}>
        <div className='card__main'>
          <img className='card-img-top' src={item.image} alt={item.name} />
          <div className='card-body'>
            <h3 className='card__header'>{item.name}</h3>
            <p className='list-item'>{item.gender}</p>
            <p className='list-item'>{item.species}</p>
          </div>
        </div>
      </div>
    )}
  </Spring>
);

export default UserCards;
