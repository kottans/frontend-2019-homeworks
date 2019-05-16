const url = "https://rickandmortyapi.com/api/character/";

let getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getData;
