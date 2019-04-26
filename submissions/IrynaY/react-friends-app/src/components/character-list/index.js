import React from 'react';
import propTypes from 'prop-types'
import './style.css';

import CharacterInfo from '../character-info'

const CharacterList = ({ list, children }) => 
  <div className='content'>
    <div className='character-list'>
      {list.map(character =>
        <CharacterInfo
          image={character.image}
          url={character.url}
          name={character.name}
          status={character.status}
          species={character.species}
          type={character.type}
          gender={character.gender}
          key={character.id}/>
        )
      }
    </div>
    {(list.length === 0) ? <div className='notFound'> Ooops! Data not found. </div> : children}
  </div>

CharacterList.propTypes = {
  list: propTypes.array,
}

export default CharacterList
