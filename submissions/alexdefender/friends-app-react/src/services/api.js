const API_URL = "https://rickandmortyapi.com/api/character";

export const getDataFromApi = async () => {
    const response = await fetch(API_URL);
    const result = await response.json();

    return result.results;
}
