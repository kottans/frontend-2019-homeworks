import React from 'react';
import propTypes from 'prop-types'
import './style.css';


import CharacterInfo from '../character-info'
import Pagination from '../pagination'

function CharacterList(props) {
  console.log(">>>", props)
  return (
    <div className='content'>
      <div className='character-list'> 
      {props.list.map(character => 
        <CharacterInfo 
          image={character.image} 
          url={character.url}
          name={character.name}
          status={character.status}
          species={character.species}
          type={character.type}
          gender={character.gender}
          key={character.id}
        />
      )}
      </div>
      <Pagination 
        currentPage={props.page} 
        // next={props.next} 
        // prev={props.prev}
        />
    </div>
  )
}

CharacterList.propTypes = {
  list: propTypes.array,
  // page: propTypes.array,
}


export default CharacterList