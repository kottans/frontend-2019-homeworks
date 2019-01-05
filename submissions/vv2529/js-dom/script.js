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
	loadData(title, displayData);
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
}

function loadData(title, callback){
	// Check if requested data is cached
	if(title in savedData) callback(title);
	else fetch(`data/${title}.json`)
		.then(response => response.json())
		.then(data => {
			savedData[title] = data;
			callback(title);
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

loadData('home', displayData);
