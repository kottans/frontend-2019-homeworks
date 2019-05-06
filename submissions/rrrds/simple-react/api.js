const API_BASE = "https://rickandmortyapi.com/api";

function addIds(data, propNames) {
  propNames = [].concat(propNames || []);

  const getId = str => str.match(/\/(\d+)$/)[1];

  propNames.forEach(prop => {
    if (Array.isArray(data[prop])) {
      data[prop] = data[prop].map(item => {
        return {
          url: item,
          id: item ? getId(item) : null
        };
      });
    } else {
      const url = data[prop].url;
      data[prop].id = url ? getId(url) : null;
    }
  });

  return data;
}

const addCharAllIds = data => addIds(data, ["episode", "location", "origin"]);

export async function fetchCharacterMulti(id) {
  const idStr = [].concat(id || []).join(",");

  const res = await fetchData(`/character/${idStr}`).then(data => {
    return (data = [].concat(data || []).map(item => addCharAllIds(item)));
  });

  return res;
}

export async function fetchCharacter(id) {
  const res = await fetchData(`/character/${id}`).then(data =>
    addCharAllIds(data)
  );

  return res;
}

export async function fetchCharacterAll(page = 1, filters) {
  const allFilters = { name: "", gender: "" };
  filters = Object.assign(allFilters, filters);

  const filterString = Object.keys(filters)
    .map(key => {
      return `${key}=${filters[key]}`;
    })
    .join("&");

  return await fetchData(`/character/?page=${page}&${filterString}`);
}

export async function fetchEpisodeAll(page = 1, filters) {
  const allFilters = { name: "" };
  filters = Object.assign(allFilters, filters);

  const filterString = Object.entries(filters)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");

  return await fetchData(`/episode?page=${page}&${filterString}`);
}

export async function fetchEpisode(id) {
  const res = await fetchData(`/episode/${id}`).then(data =>
    addIds(data, "characters")
  );

  return res;
}

export async function fetchEpisodeMulti(id) {
  const idStr = [].concat(id || []).join(",");

  const res = await fetchData(`/episode/${idStr}`).then(data => {
    return [].concat(data || []).map(item => addIds(item, "characters"));
  });

  return res;
}

export async function fetchLocationAll(page = 1, filters) {
  const allFilters = { name: "" };
  filters = Object.assign(allFilters, filters);

  const filterString = Object.entries(filters)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");

  return await fetchData(`/location?page=${page}&${filterString}`).then(
    data => {
      console.log(data);
      if (!data) return { results: [], pages: 0 };

      return { results: data.results, pages: data.info.pages };
    }
  );
}

export async function fetchLocation(id) {
  const res = await fetchData(`/location/${id}`).then(data =>
    addIds(data, "residents")
  );

  return res;
}

export async function fetchLocationMulti(id) {
  const idStr = [].concat(id || []).join(",");

  const res = await fetchData(`/location/${idStr}`).then(data => {
    return [].concat(data || []).map(item => addIds(item, "residents"));
  });

  return res;
}

async function fetchData(path) {
  return await fetch(`${API_BASE}${path}`)
    .then(res => {
      if (res.status !== 200) return null;

      return res.json();
    })
    .catch(err => null);
}
