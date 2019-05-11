export default function(arg) {
  const APIPATHS = {
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

  return query(`${APIPATHS.ApiCharactersCall}${arg}`);
}
