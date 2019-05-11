export default form => {
  const ADDITIONALINPUTS = {
    searchInput: "search"
  };

  const formNodeElements = Object.entries(form).map(element => element[1]);

  const checkIfElementHasNameAttr = element => {
    return element.name ? element : null;
  };

  const returnCheckedElement = element => {
    return element.checked || element.type === ADDITIONALINPUTS.searchInput
      ? { name: element.name, value: element.value }
      : null;
  };

  return formNodeElements
    .filter(checkIfElementHasNameAttr)
    .map(returnCheckedElement)
    .filter(item => item);
};
