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
		const fn = filters[key];
		shownUserData = shownUserData.filter(fn);
	}

	userData.forEach(user => {
		getUserCard(user).classList[
			~shownUserData.indexOf(user) ? 'remove' : 'add'
		]('hidden');
	});

	container.classList.remove('invisible');
}

document.getElementById('input-search').addEventListener('input', function() {
	if (this.value) {
		filters.search = user => ~user.name.full.indexOf(this.value.toLowerCase());
	} else delete filters.search;
	refreshCards();
});
document.getElementById('select-gender').addEventListener('change', function() {
	const val = this.selectedOptions[0].value;
	if (val != 'all') {
		filters.gender = user => user.gender == val;
	} else delete filters.gender;
	refreshCards();
});
document
	.getElementById('filter-set')
	.addEventListener('click', function(event) {
		const radio = event.target.closest('label').firstElementChild;
		const fns = {
			'name-asc': (a, b) => (a.name.full < b.name.full ? -1 : 1),
			'name-desc': (a, b) => (a.name.full < b.name.full ? 1 : -1),
			'age-asc': (a, b) => (a.dob.age < b.dob.age ? -1 : 1),
			'age-desc': (a, b) => (a.dob.age < b.dob.age ? 1 : -1)
		};
		const fn = fns[radio.value];
		newUserData = userData.slice().sort(fn);
		refreshCards();
	});
document.getElementById('btn-reset').addEventListener('click', function() {
	document.getElementById('input-search').value = '';
	document.getElementById('select-gender').selectedIndex = 0;
	filters = {};
	refreshCards();
});
