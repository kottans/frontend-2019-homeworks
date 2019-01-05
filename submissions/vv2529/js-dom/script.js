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
	if(data){
		main.innerHTML = data;
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
			// Now we save a string with ready content
			savedData[title] = parseData(data);
			callback(title);
		}, () => {
			showError(title);
		});
}

function showError(title){
	main.innerHTML = parseData({
		heading: 'No content!',
		paragraphs: [
			`No data could be displayed for <q>${title}</q> query, sorry :(`
		]
	});
}

function parseData(data){
	if(!data) return;
	let str = `<h1>${data.heading}</h1>`;
	data.paragraphs.forEach(item => {
		str += `<p>${item}</p>`;
	});
	return str;
}

/*
 * Initiate
 */

loadData('home', displayData);
