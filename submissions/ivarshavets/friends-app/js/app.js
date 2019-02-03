const initApp = (data) => {
	const API_URL = 'https://randomuser.me/api/?results=50'
	const FILTER_OPTIONS = {
		genderAll: 'all',
		byNameAsc: 'nameAsc',
		byNameDesc: 'nameDesc',
		byAgeAsc: 'ageAsc',
		byAgeDesc: 'ageDesc',
	}

	const container = document.querySelector('.friends_list')
	const searchInput = document.querySelector('.search_input')
	const filterInputs = document.querySelectorAll('.filter_input')
	const orderInputs = document.querySelectorAll('.order_input')
	const resetButton = document.querySelector('.reset_button')

	let initialFriendsList = []
	let initialFilterOptions = {
		name: null,
		gender: FILTER_OPTIONS.genderAll,
		order: null
	}
	let currentFilterOptions = {...initialFilterOptions}

	const initFriendsList = () => {
		fetch(API_URL)
		.then((response) => response.json())
		.then(({results}) => {
			initialFriendsList = results

			renderFriendsList(initialFriendsList)
		})
		.catch(error => console.log(`Parsing is failed with ${error}`))
	}

	const renderFriendsList = (data) => {
		let content = ''
		if (!data.length) {
			content += '<h3>There are no friends</h3>'
		}

		data.forEach((item) => {
			content += `<li class="cards__item friend">
				<img src="${item.picture.large}" class="friend__thumbnail">
				<div class="friend__info">
					<p class="friend__info--name friend__info">${item.name.first}  ${item.name.last}</p>
					<p class = "friend__info"><b>Gender:</b> ${item.gender}</p>
					<p class = "friend__info"><b>Age:</b> ${item.dob.age}</p>
					<p class = "friend__info"><b>Email:</b> ${item.email}</p>
					<p class = "friend__info"><b>Phone:</b> ${item.phone}</p>
				</div>
			</li>`
		})
		container.innerHTML = content
	}

	const searchByName = (list, value) => list.filter(el => el.name.first.includes(value.toLowerCase()) ||
		el.name.last.includes(value.toLowerCase()))

	const sortByGender = (list, gender) => list.filter(el => el.gender.toLowerCase() === gender)

	const sortByAgeAsc = (list) => list.sort((a, b)=> a.dob.age - b.dob.age)

	const sortByAgeDesc = (list) => list.sort((a, b) => b.dob.age - a.dob.age)

	const sortByNameAsc = (list) => list.sort((a, b) => a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1)

	const sortByNameDesc = (list) => list.sort((a, b) => a.name.first.toLowerCase() > b.name.first.toLowerCase() ? -1 : 1)

	const getOrderedList = (list, value) => {
		if (value === FILTER_OPTIONS.byNameAsc) return sortByNameAsc(list)
		if (value === FILTER_OPTIONS.byNameDesc) return sortByNameDesc(list)
		if (value === FILTER_OPTIONS.byAgeAsc) return sortByAgeAsc(list)
		if (value === FILTER_OPTIONS.byAgeDesc) return sortByAgeDesc(list)
	}

	const applyAllFilters = () => {
		let resultFriendsList = [...initialFriendsList]

		if (currentFilterOptions.gender !== initialFilterOptions.gender) resultFriendsList = sortByGender(resultFriendsList, currentFilterOptions.gender)
		if (currentFilterOptions.name) resultFriendsList = searchByName(resultFriendsList, currentFilterOptions.name)
		if (currentFilterOptions.order) resultFriendsList = getOrderedList(resultFriendsList, currentFilterOptions.order)

		renderFriendsList(resultFriendsList)
	}

	const search = ({currentTarget: {value}}) => {
		currentFilterOptions.name = value
		applyAllFilters()
	}

	const filterList = ({currentTarget: {value}}) => {
		currentFilterOptions.gender = value
		applyAllFilters()
	}

	const orderList = ({currentTarget: {value}}) => {
		currentFilterOptions.order = value
		applyAllFilters()
	}

	const resetAllFilters = () => {
		currentFilterOptions = {...initialFilterOptions}
		renderFriendsList(initialFriendsList)
		searchInput.value = ''

		document.querySelectorAll("input:checked").forEach(input => input.checked = false)
		document.querySelector(`input[value='${initialFilterOptions.gender}']`).checked = true
	}

	initFriendsList()

	searchInput.addEventListener('keyup', search)
	filterInputs.forEach(input => input.addEventListener('click', filterList))
	orderInputs.forEach(input => input.addEventListener('click', orderList))
	resetButton.addEventListener('click', resetAllFilters)
}

document.addEventListener('DOMContentLoaded', initApp())
