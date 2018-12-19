const API_RANDOM_USER = 'https://randomuser.me/api/?results=50'

const radioInputs = document.querySelectorAll('input[type=radio]')
const searchInput = document.querySelector('#search')
const resetBtn = document.querySelector('#resetBtn')
const genderAll = document.querySelector('input[data-gender=all]')
const content = document.querySelector('#content')

const state = {
  data: [],
  filters: {
    search: null,
    gender: null,
    sortBy: null
  }
}

const isEqual = (a, b) => a === b

const sort = {
  nameDec: data => data.sort((a, b) => (b.name.first > a.name.first ? 1 : -1)),
  nameInc: data => data.sort((a, b) => (b.name.first < a.name.first ? 1 : -1)),
  ageDec: data => data.sort((b, a) => (b.dob.age > a.dob.age ? -1 : 1)),
  ageInc: data => data.sort((a, b) => (b.dob.age > a.dob.age ? -1 : 1))
}

const insertContent = (el, content, method) => {
  const node = document.createElement(`${el}`)

  method ? node[method](...content) : (node.textContent = content)
  return node
}

const createCard = obj => {
  const image = insertContent('img', ['src', obj.picture.large], 'setAttribute')
  const name = insertContent('p', `${obj.name.first} ${obj.name.last}`)
  const phone = insertContent('p', `T.: ${obj.phone}`)
  const email = insertContent('p', obj.email)
  const age = insertContent('p', `I have ${obj.dob.age} year`)
  const gender = insertContent('p', obj.gender)
  const info = insertContent(
    'figcaption',
    [name, gender, age, phone, email],
    'append'
  )
  const cart = insertContent('figure', [image, info], 'append')

  return cart
}

const resetFilters = e => {
  e.preventDefault()
  const { filters, data } = state
  Object.keys(filters).forEach(key => (filters[key] = null))
  radioInputs.forEach(input => (input.checked = false))
  genderAll.checked = true
  searchInput.value = ''

  render(data)
}

const render = friends => {
  const fragment = document.createDocumentFragment()
  content.innerHTML = ''

  friends.forEach(friend => fragment.append(createCard(friend)))
  content.append(fragment)
}

const filterData = () => {
  const {
    data,
    filters: { gender, sortBy, search }
  } = state

  let newData = [...data]
  if (gender) {
    newData = isEqual(gender, 'all')
      ? newData
      : newData.filter(obj => isEqual(obj.gender, gender))
  }
  if (sortBy) {
    newData = sort[sortBy](newData)
  }
  if (search) {
    newData = newData.filter(obj => {
      return [obj.name.first, obj.name.last]
        .join()
        .toUpperCase()
        .includes(search.toUpperCase())
    })
  }
  return newData
}
const getValueToSearch = ({ target: { value } }) => {
  state.filters.search = value
  render(filterData())
}
const setFilter = ({ target: { dataset } }) => {
  if (dataset.sortBy) {
    state.filters.sortBy = dataset.sortBy
  }
  if (dataset.gender) {
    state.filters.gender = dataset.gender
  }
  render(filterData())
}

const mountListeners = () => {
  radioInputs.forEach(input => input.addEventListener('change', setFilter))
  searchInput.addEventListener('input', getValueToSearch)
  resetBtn.addEventListener('click', resetFilters)

  render(state.data)
}

const fetchData = async url => {
  try {
    const data = await fetch(url)
    const { results } = await data.json()

    state.data = [...results]
    mountListeners()
  } catch (err) {
    console.info(err)
  }
}

window.onload = fetchData(API_RANDOM_USER)
