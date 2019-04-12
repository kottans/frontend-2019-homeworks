const URL = 'https://rickandmortyapi.com/api/character/'

export const fetchCharacterList = (query) => {
  let uri = URL
  if(query)
    uri += '?' + query
  return fetch(uri).then(resp => !resp.ok ? [] : resp.json())
}
