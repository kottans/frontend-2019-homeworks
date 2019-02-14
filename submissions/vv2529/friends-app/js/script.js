const container = document.getElementById('content');

container.addEventListener('click', function(event) {
	const elem = event.target;
	if (!elem.classList.contains('show-more')) return;
	event.preventDefault();
	elem.textContent = elem.parentNode
		.querySelector('.extra')
		.classList.toggle('extra-hidden')
		? 'Show more'
		: 'Show less';
});
document
	.getElementById('btn-load-more')
	.addEventListener('click', loadNewUsers);

function getNewUsers(count, callback) {
	return fetch('https://randomuser.me/api?results=' + count)
		.then(response => response.json())
		.then(data => {
			const results = data.results;
			results.forEach((user, i, arr) => {
				user.name.full = user.name.first + ' ' + user.name.last;
			});
			userData.push(...results);
			shownUserData.push(...results);
			callback(results);
		});
}

const userChunk = 12;
let userData = [],
	shownUserData = [],
	newUserData = [];

function showUsers(results) {
	container.innerHTML += results.map(user => makeUserCard(user)).join('');
}
function makeUserCard(data) {
	return `<div class="card">
	<img src="${data.picture.large}" alt="picture" class="picture">
	<p class="user age">${data.dob.age} y.o.</p>
	<a href="#" class="show-more">Show more</a>
	<div class="extra extra-hidden">
		<p class="user email">${data.email}</p>
		<p class="user phone">${data.phone}</p>
		<p class="user city">${data.location.city}, ${data.location.state}</p>
	</div>
	<div class="username ${data.gender}">${data.name.full}</div>
</div>`;
}
function loadNewUsers() {
	getNewUsers(userChunk, results => showUsers(results));
}

function getUserCard(user) {
	return container.children[userData.indexOf(user)];
}
function getUserCards(arr) {
	return arr.map(user => getUserCard(user));
}

loadNewUsers();
