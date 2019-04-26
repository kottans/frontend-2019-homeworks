const URL = 'https://randomuser.me/api/?results=50';

FiltersContainer.onChange(filterResult => {
  FriendsList.showFriendList(filterResult);
});

fetch(URL)
  .then(res => {
    return res.json();
  })
  .then(({ results }) => {
    FiltersContainer.filterData(results);
  })
  .then(error => console.log(error));
