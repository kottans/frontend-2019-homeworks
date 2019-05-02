export default form => {
  const additionalInputsToParse = {
    searchInput: "search"
  };

  return Object.entries(form)
    .filter(item => (item[1].name ? item : null))
    .map(item => {
      return item[1].checked ||
        item[1].type === additionalInputsToParse.searchInput
        ? { name: item[1].name, value: item[1].value }
        : null;
    })
    .filter(item => (item ? item : null));
};
