import React from 'react';

const UserCards = item => (
  <div key={item.id} className='user'>
    <div className='card__main'>
      <img className='card-img-top' src={item.image} alt={item.name} />
      <div className='card-body'>
        <h3 className='card__header'>{item.name}</h3>
        <p className='list-item'>{item.gender}</p>
        <p className='list-item'>{item.species}</p>
      </div>
    </div>
  </div>
);

export default UserCards;
