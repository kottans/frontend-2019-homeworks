const listItems = document.querySelectorAll('.listItem');
const descriptions = document.querySelectorAll('.description');
const replaceClass = (array, tObject, className) => {
  array.forEach(item => {
    if (item == tObject) {
      tObject.classList.add(className);
    } else {
      item.classList.remove(className);
    }
  });
};
const openTab = ({target}) => {
  replaceClass(listItems, target, 'selected');
  replaceClass(descriptions, target.descriptionItem, 'showTab');
};
listItems.forEach((item, i) => {
  item.descriptionItem = descriptions[i];
  item.addEventListener('click', openTab);
});

