let url = new URL(`https://gateway.marvel.com/v1/public/comics`),
  defaultParams = {
    ts: '1',
    apikey: '1136faa63131cec339ae63058b627b70',
    hash: '7abf5f031a9f3f0031ac8c51fcfe8da0',
    format: 'comic',
    formatType: 'comic',
    noVariants: true,
    hasDigitalIssue: false,
  };

export const getComicsList = async params => {
  const urlParams = new URLSearchParams({
    ...defaultParams,
    ...params,
  }).toString();
  const response = await fetch(`${url}?${urlParams}`);
  if (response.status === 200) {
    const results = await response.json();
    const { offset, total } = results.data;
    const list = results.data.results;
    return { list, offset, total };
  }
  throw new Error(response.status);
};
