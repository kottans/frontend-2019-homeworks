const URLS = {
  characters: 'https://rickandmortyapi.com/api/character/',
  locations: 'https://rickandmortyapi.com/api/location',
  episodes: 'https://rickandmortyapi.com/api/episode',
}


const getData = async url => {
  const response = await fetch(url);
  const result = await response.json();
  
  return result;
}

const getCurrentPage = (pagePrevLink) => {
  return pagePrevLink ? 1 : +pagePrevLink + 1;
}

const createLinkForRequest = (objAttributes, url) => {
  if (objAttributes) {
    url += '?';

    Object.keys(objAttributes).forEach(property => {
      if (objAttributes[property]) {
        url += `&${property}=${objAttributes[property]}`;
      }
    })
  }

  return url;
}

export const getCharacters = async (objAttributes, url = URLS.characters) => {
  const createdUrl = createLinkForRequest(objAttributes, url);
  const data = await getData(createdUrl);
  const currentPage = await getCurrentPage(data.info.prev);

  data.info.currentPage = currentPage;
  
  return data;
};
