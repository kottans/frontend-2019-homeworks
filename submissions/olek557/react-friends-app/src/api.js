const url = "https://rickandmortyapi.com/api/character/";


let getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


export default getData;