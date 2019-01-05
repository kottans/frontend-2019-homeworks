// "getId" is much easier to write :)
function getId(id){return document.getElementById(id)}

const navbar = getId('navbar');
const main = getId('main');

/*
 * Events
 */

getId('navbar-toggle').addEventListener('click', function(){
	navbar.classList.toggle('shown');
});

navbar.addEventListener('click', function(event){
	// delegate clicks from <li>s to <nav>
	const elem = event.target;
	if(elem.nodeName != 'LI') return;

	const title = elem.textContent;
	loadData(title);
	navbar.classList.remove('shown');
});

/*
 * Functionality
 */

let currentPage = '';
const savedData = {};

function displayData(title){
	if(title == currentPage) return;
	const data = savedData[title];
	if(data.content){
		main.innerHTML = data.content;
		currentPage = title;
	}
	else showError();
	console.log('displayData:', title);
}

function loadData(title){
	// Check if requested data is cached
	if(title in savedData) displayData(title);
	else fetch(`data/${title}.json`)
		.then(response => response.json())
		.then(data => {
			savedData[title] = data;
			displayData(title);
		}, () => {
			showError(title);
		});
}

function showError(title){
	main.innerHTML = `<h1>No content!</h1><p>No data could be displayed for <q>${title}</q> query, sorry :(</p>`;
}

/*
 * Initiate
 */

loadData('home');
