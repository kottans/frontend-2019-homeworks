let url = new URL(`https://gateway.marvel.com/v1/public/comics`),
  params = {
    ts: '1',
    apikey: '1136faa63131cec339ae63058b627b70',
    hash: '7abf5f031a9f3f0031ac8c51fcfe8da0',
    format: 'comic',
    formatType: 'comic',
    noVariants: true,
    hasDigitalIssue: false,
    limit: 20,
  };
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

const ignores = ['http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'];
const checkingThumbnail = item => {
  if (!item.thumbnail || !item.thumbnail.path) {
    return false;
  }
  var thumb = item.thumbnail;
  return (
    thumb.path.indexOf('image_not_available') === -1 &&
    ignores.indexOf(thumb.path) === -1
  );
};
export const setComicsSearchParams = searchParams => {
  const availableSearchParamsArr = [
    'orderBy',
    'titleStartsWith',
    'limit',
    'offset',
  ];

  availableSearchParamsArr.forEach(paramsKey =>
    !searchParams[paramsKey]
      ? url.searchParams.delete(paramsKey)
      : url.searchParams.set(paramsKey, searchParams[paramsKey]),
  );
};
export const getComicsList = async () => {
  const response = await fetch(url);
  const results = await response.json();
  const { offset, total } = await results.data;
  const list = await results.data.results.filter(checkingThumbnail);
  return { list, offset, total };
};
