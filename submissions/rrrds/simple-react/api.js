const API = "https://rickandmortyapi.com/api";

export async function fetchCharacter(id) {
  if (Array.isArray(id)) {
    id = id.join(",");
  }

  const res = await fetch(`${API}/character/${id}`)
    .then(body => body.json())
    .then(data => {
      const addIds = data => {
        data.episode = data.episode.map(ep => {
          return {
            url: ep,
            id: ep.match(/\/(\d+)$/)[1]
          };
        });
        data.location.id = data.location.url
          ? data.location.url.match(/\/(\d+)$/)[1]
          : null;
        data.origin.id = data.origin.url
          ? data.origin.url.match(/\/(\d+)$/)[1]
          : null;

        return data;
      };

      if (Array.isArray(data)) {
        data = data.map(item => addIds(item));
      } else {
        data = addIds(data);
      }

      return data;
    });

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

  const res = await fetch(
    `${API}/character/?page=${page}&${filterString}`
  ).then(body => body.json());

  return res;
}

export async function fetchEpisodeAll(page = 1) {
  const res = await fetch(`${API}/episode?page=${page}`).then(body =>
    body.json()
  );

  return res;
}

export async function fetchEpisode(id) {
  if (Array.isArray(id)) {
    id = id.join(",");
  }

  const res = await fetch(`${API}/episode/${id}`)
    .then(body => body.json())
    .then(data => {
      const addIds = data => {
        data.characters = data.characters.map(char => {
          return {
            url: char,
            id: char.match(/\/(\d+)$/)[1]
          };
        });

        return data;
      };

      if (Array.isArray(data)) {
        data = data.map(item => addIds(item));
      } else {
        data = addIds(data);
      }

      return data;
    });

  return res;
}

export async function fetchLocationAll(page = 1) {
  const res = await fetch(`${API}/location?page=${page}`).then(body =>
    body.json()
  );

  return res;
}

export async function fetchLocation(id) {
  if (Array.isArray(id)) {
    id = id.join(",");
  }

  const res = await fetch(`${API}/location/${id}`)
    .then(body => body.json())
    .then(data => {
      const addIds = data => {
        data.residents = data.residents.map(char => {
          return {
            url: char,
            id: char.match(/\/(\d+)$/)[1]
          };
        });

        return data;
      };

      if (Array.isArray(data)) {
        data = data.map(item => addIds(item));
      } else {
        data = addIds(data);
      }

      return data;
    });

  return res;
}
