const API_URL = "https://rickandmortyapi.com/api/character";

export const getDataFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    const list = result.results.map(item => {
      return {
        name: item.name,
        image: item.image,
        gender: item.gender,
        location: item.location.name,
        species: item.species,
        status: item.status
      };
    });
    return list;
  } catch (err) {
    console.log(err);
  }
};
