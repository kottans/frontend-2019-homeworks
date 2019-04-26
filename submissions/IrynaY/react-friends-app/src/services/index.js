const URL = 'https://rickandmortyapi.com/api/character/'

export const createQueryStringFromObject = obj => {
  const searchParams = new URLSearchParams('')
  for(const key in obj) {
    if(obj[key] !== '')
      searchParams.append(key, obj[key])
  }
  return searchParams.toString()
}

export const fetchCharacterList = query => {
  let uri = URL
  if(query)
    uri += '?' + query
  return fetch(uri).then(resp => {
    if(resp.ok)
      return resp.json()
    throw new Error(resp.statusText)
  })
}
