// "Id" is much easier to write :)
function Id(id){return document.getElementById(id)}

/*
 * Events
 */

Id('navbar-toggle').addEventListener('click', function(){
	Id('navbar').classList.toggle('shown');
});

Id('navbar').addEventListener('click', function(event){
	// delegate clicks from <li>s to <nav>
	const elem = event.target;
	if(elem.nodeName != 'LI') return;

	const title = elem.textContent;
	loadData(title);
	Id('navbar').classList.remove('shown');
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
		Id('main').innerHTML = data.content;
		currentPage = title;
	}
	else showError();
	console.log('displayData:', title);
}

function loadData(title){
	// Check if requested data is cached
	if(title in savedData) displayData(title);
	else fetch('data/'+title+'.json')
		.then(response => response.json())
		.then(data => {
			savedData[title] = data;
			displayData(title);
		}, () => {
			showError(title);
		});
}

function showError(title){
	Id('main').innerHTML = '<h1>No content!</h1><p>No data could be displayed for <q>'+title+'</q> query, sorry :(</p>';
}

/*
 * Initiate
 */

loadData('home');
