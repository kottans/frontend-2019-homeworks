import React from 'react';
import propTypes from 'prop-types'
import './style.css';

import CharacterInfo from '../character-info'

const CharacterList = ({ list, children }) => {
  return(
    <div className='content'>
      <div className='character-list'>
      {list && 
        list.map(character =>
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
      {list ? children : <div className='notFound'> 404 </div>}
    </div>
  )
}

CharacterList.propTypes = {
  list: propTypes.array,
}

export default CharacterList
