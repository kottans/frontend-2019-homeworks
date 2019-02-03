;(async () => {
  const OPTS = { method: 'GET', headers: {}, dataType: 'json'}
  const API_URL = "https://randomuser.me/api/?results=16"
  const USERS_LIST = await getUsers()
  const USER_CONTAINER = document.getElementById("content")
  const NAME_SEARCH = document.getElementById("name-search")
  const NAME_SORT = document.getElementById("name-sort")
  const AGE_SORT = document.getElementById("age-sort")
  const GENDER = document.getElementById("gender")
  const CLEAR_FILTERS = document.getElementById("filter-reset")
  const ASC = (a, b) => a < b ? -1 : 1
  const DESC = (a, b) => a < b ? 1 : -1
  const FILTERS = {
    name: null,
    sortName: null,
    sortAge: null,
    sortGender: null
  }

  function getUsers(){
    return fetch(API_URL, OPTS)
      .then(res => res.json())
      .then(json => json.results)
      .catch(console.error)
  }

  function createUserCard(user){
    const USER_CARD = document.createElement("div")
    const USER_NAME = document.createElement("p")
    const USER_PHOTO = document.createElement("img")
    const USER_INFO = document.createElement("p")
    const USER_CITY = document.createElement("p")
    const USER_PHONE = document.createElement("p")

    USER_CARD.classList = "user-card"
    USER_NAME.innerHTML = `${user.name.first} ${user.name.last}`
    USER_PHOTO.src = user.picture.large
    USER_INFO.classList = "user-info"
    USER_INFO.innerHTML = "Age: " + user.dob.age
    USER_CITY.classList = "user-city"
    USER_CITY.innerHTML = user.location.city
    USER_PHONE.innerHTML = user.phone
    if(user.gender == "female") {
      USER_PHOTO.classList = "user-img female-shadow"
      USER_NAME.classList = USER_NAME.classList + "user-name female"
    } else {
      USER_PHOTO.classList = "user-img male-shadow"
      USER_NAME.classList = "user-name male"
    }
    USER_CARD.append(USER_PHOTO, USER_NAME, USER_INFO, USER_PHONE, USER_CITY)
    return USER_CARD
  }

  function resetActive(){
    const elements = Array.from(document.getElementsByClassName("active"))
    for(let element of elements){
      element.classList.toggle("active")
    }
  }

  function displayUsersList(list){
    const fragment = document.createDocumentFragment();
    list.forEach(user => fragment.append(createUserCard(user)))
    USER_CONTAINER.append(fragment)
  }

  function applyFilters(){
    let filteredList = USERS_LIST
    USER_CONTAINER.innerHTML = ""
    if(FILTERS.name)
      filteredList = filteredList.filter(user => {
        let name = new RegExp(FILTERS.name).test(user.name.first)
        return name
      })

    if(FILTERS.sortName)
      filteredList = filteredList.sort((prev, next) => FILTERS.sortName(prev.name.first, next.name.first))

    if(FILTERS.sortAge)
      filteredList = filteredList.sort((prev, next) => FILTERS.sortAge(prev.dob.age, next.dob.age))

    if(FILTERS.sortGender)
      filteredList = filteredList.filter(user => user.gender === FILTERS.sortGender)

    displayUsersList(filteredList)
  }

  displayUsersList(USERS_LIST)

  NAME_SEARCH.addEventListener("input", event => {
    FILTERS.name = event.target.value.toLowerCase()
    applyFilters()
  })

  NAME_SORT.addEventListener("click", (event) => {
    if (event.target.dataset.sort) {
      resetActive()
      event.target.classList.toggle("active")
      FILTERS.sortName = event.target.id === "name-asc" ? ASC : DESC
      FILTERS.sortAge = null
      applyFilters()
    }
  })

  AGE_SORT.addEventListener("click", (event) => {
    if(event.target.dataset.sort){
      resetActive()
      event.target.classList.toggle("active")
      FILTERS.sortAge = event.target.id === "age-asc" ? ASC : DESC
      FILTERS.sortName = null
      applyFilters()
    }
  })

  GENDER.addEventListener("click", event =>{
    if(event.target.name === "gender"){
      FILTERS.sortGender = event.target.value
      applyFilters()
    }
  })

  CLEAR_FILTERS.addEventListener("click", () => {
    for(let data in FILTERS){
      FILTERS[data] = null
    }
    NAME_SEARCH.value = ""
    resetActive()
    document.getElementById("gender-m").checked = false
    document.getElementById("gender-f").checked = false
    USER_CONTAINER.innerHTML = ""
    displayUsersList(USERS_LIST)
  })
})();
