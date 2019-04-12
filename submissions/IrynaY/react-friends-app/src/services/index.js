const fetchy = (url) => 
  fetch(url).then(resp => {
    if(resp.ok)
      return resp.json()
    throw new Error(resp.statusText)
  })

export const fetchCharacterList = (query) => 
  fetchy(`https://rickandmortyapi.com/api/character/?page=${query}`)