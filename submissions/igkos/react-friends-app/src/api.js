let url = new URL(`https://gateway.marvel.com/v1/public/comics`), //holder path for comics without images
  params = {
    ts: '1',
    apikey: '1136faa63131cec339ae63058b627b70',
    hash: '7abf5f031a9f3f0031ac8c51fcfe8da0',
    format: 'comic',
    formatType: 'comic',
    noVariants: true,
    hasDigitalIssue: false,
  };
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

export const getComicsList = async params => {
  const availableParamsArr = ['orderBy', 'titleStartsWith', 'limit', 'offset'];

  await availableParamsArr.forEach(paramsKey =>
    !params[paramsKey]
      ? url.searchParams.delete(paramsKey)
      : url.searchParams.set(paramsKey, params[paramsKey]),
  );
  const response = await fetch(url);
  const results = await response.json();
  const { offset, total } = await results.data;
  const list = await results.data.results;
  return { list, offset, total };
};
