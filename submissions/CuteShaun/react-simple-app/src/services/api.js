const URL = "https://rickandmortyapi.com/api/character";

const getData = async () => {
  try {
    const response = await fetch(URL);
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

export default getData;
