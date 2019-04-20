export const createDomFragment = string => {
  const template = document.createElement("template");
  template.innerHTML = string.trim();
  return template.content;
};

export const clearDomChildren = domElement => {
  domElement.innerHTML = "";
  return domElement;
};

export const appendDomFragment = (domElement, domFragment) => {
  if (Array.isArray(domFragment)) {
    domElement.append(...domFragment);
  } else {
    domElement.append(domFragment);
  }
  return domElement;
};

export const bindScope = (scope, ...names) => {
  names.forEach(name => {
    if (typeof scope[name] === "function") {
      scope[name] = scope[name].bind(scope);
    } else {
      throw Error(
        `Expected ${name} to be a function. Instead ${name} is ${typeof scope[
          name
        ]}`
      );
    }
  });
};

export const pushToStorage = (item, key) => {
  const data = localStorage[key] ? JSON.parse(localStorage[key]) : [];
  let newData = data.slice();
  if (item) {
    if (!newData.includes(item)) {
      newData.push(item);
    }
    if (newData.length === 10) {
      newData.shift();
    }
    localStorage[key] = JSON.stringify(newData);
  }
};

export const popFromStorage = (item, key) => {
  const data = localStorage[key] ? JSON.parse(localStorage[key]) : [];
  let newData = data.slice();
  const index = newData.indexOf(item);
  newData.splice(index, 1);
  localStorage[key] = JSON.stringify(newData);
};

export const toggleInStorage = (item, key) => {
  const data = localStorage[key] ? JSON.parse(localStorage[key]) : [];
  const inStorage = data.slice().indexOf(item) !== -1;
  console.log("" + item);
  if (!inStorage) {
    pushToStorage(item, key);
    console.log("" + item);
  } else {
    popFromStorage(item, key);
  }
};

export const isInStorage = (item, key) => {
  const data = localStorage[key] ? JSON.parse(localStorage[key]) : [];
  return data.slice().indexOf(item) != -1;
};

export const monthDay = timestamp => {
  const xx = new Date(timestamp * 1000);
  const options = {
    day: "2-digit",
    month: "2-digit"
  };
  return new Intl.DateTimeFormat("en-US", options).format(xx);
};

export const hourMinute = timestamp => {
  const xx = new Date(timestamp * 1000);
  const options = {
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Intl.DateTimeFormat("en-US", options).format(xx);
};
