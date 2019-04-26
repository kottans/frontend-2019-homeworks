export const getList = async api => {
  const response = await fetch(api);
  const result = await response.json();
  return result;
};
