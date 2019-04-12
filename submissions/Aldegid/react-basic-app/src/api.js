//const API_KEY = 'a87e80b7f051a451181ad59776a0290a';
//const API_HASH='6ba6f66634f26f6ed96f15e92bc1d428';
//http://gateway.marvel.com/v1/public/comics?format=digital%20comic&ts=1&apikey=${API_KEY}&hash=${API_HASH}

export const getList = async (api) => {
  const response  = await fetch(api);
  const result = await response.json();
  //console.log(result);
  return result;
}
