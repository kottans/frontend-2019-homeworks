const API_KEY = "3029b8b837f2853e0a5e2e41515fa904";
const API_HASH = "fe4d66e86f7b8a0b0215a9aedd064fed";

export const getCharacters = async () => {
 
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/series/1945/characters?ts=1&apikey=${API_KEY}&hash=${API_HASH}`
  );
  const result = await response.json();
  return result.data.results;
};
