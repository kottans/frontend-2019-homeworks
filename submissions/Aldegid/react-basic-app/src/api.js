export const getList = async api => {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
