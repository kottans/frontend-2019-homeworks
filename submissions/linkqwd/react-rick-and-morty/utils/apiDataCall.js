export default function(arg) {
  const apiPaths = {
    ApiCharactersCall: "https://rickandmortyapi.com/api/character"
  };

  async function query(address) {
    const response = await fetch(address);

    if (response.ok) {
      return await response.json();
    } else {
      throw response;
    }
  }

  return query(`${apiPaths.ApiCharactersCall}${arg}`);
}
