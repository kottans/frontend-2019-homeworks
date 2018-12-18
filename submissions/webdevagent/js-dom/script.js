let listItems = document.querySelectorAll('.listItem');
let descriptions = document.querySelectorAll('.description');
let openTab = (evt) => {
  let tab = evt.target;
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i] != tab) {
      listItems[i].style.backgroundColor = '#80dfff';
    } else {
      tab.style.backgroundColor = 'white';
    }
  }
  for (let i = 0; i < descriptions.length; i++) {
    if (descriptions[i] == tab.descriptionItem) {
      tab.descriptionItem.style.display = 'inline-block';
    } else {
      descriptions[i].style.display = 'none';
    }
  }
};
for (let i = 0; i < listItems.length; i++) {
  listItems[i].descriptionItem = descriptions[i];
  listItems[i].addEventListener('click', openTab);
};
