let filters = {};

function refreshCards() {
	container.classList.add('invisible');
	container.append(
		...getUserCards(newUserData.length ? newUserData : userData)
	);
	if (newUserData.length) {
		userData = newUserData.slice();
		newUserData.length = 0;
	}

	shownUserData = userData.slice();
	for (let key in filters) {
		shownUserData = shownUserData.filter(filters[key]);
	}

	userData.forEach(user => {
		if (shownUserData.includes(user))
			getUserCard(user).classList.remove('hidden');
		else getUserCard(user).classList.add('hidden');
	});

	container.classList.remove('invisible');
}

document
	.getElementById('input-search')
	.addEventListener('input', function({target}) {
		if (target.value) {
			filters.search = user =>
				user.name.full.includes(target.value.toLowerCase());
		} else delete filters.search;
		refreshCards();
	});
document
	.getElementById('select-gender')
	.addEventListener('change', function({target}) {
		const val = target.selectedOptions[0].value;
		if (val != 'all') {
			filters.gender = user => user.gender == val;
		} else delete filters.gender;
		refreshCards();
	});
document
	.getElementById('filter-set')
	.addEventListener('click', function({target}) {
		const radio = target.closest('label').querySelector('[type=radio]');
		const sortFunctions = {
			'name-asc': (a, b) => (a.name.full < b.name.full ? -1 : 1),
			'name-desc': (a, b) => (a.name.full < b.name.full ? 1 : -1),
			'age-asc': (a, b) => (a.dob.age < b.dob.age ? -1 : 1),
			'age-desc': (a, b) => (a.dob.age < b.dob.age ? 1 : -1)
		};
		newUserData = userData.slice().sort(sortFunctions[radio.value]);
		refreshCards();
	});
document.getElementById('btn-reset').addEventListener('click', function() {
	document.getElementById('input-search').value = '';
	document.getElementById('select-gender').selectedIndex = 0;
	filters = {};
	refreshCards();
});
