const GET_RANDOM_DATA = fetch('https://randomuser.me/api/?results=60')
.then( response => {  
	response.json().then( data => { 
		let responseData = data.results
		initRender(responseData);
	})
})

.catch( error => {  
	alert('Looks like there was a problem.');  
	return;  
});

function initRender(responseData){

	let content = document.getElementById('content');

	renderItems(responseData)

	function searchByName(responseData){
		const searchInput = document.getElementById('search-by-name')

		searchInput.addEventListener('input', (e) => {
			let searchName = responseData.filter( item =>{
				return `${item.name.first}  ${item.name.last}`.includes(e.target.value)
			})
			renderItems(searchName)	
		})
	}

	function filterByMale(responseData){
		const inputMale = document.getElementById('filter-by-male')

		inputMale.addEventListener('change', () => {
			const filterByMale = responseData.filter( item => item.gender == 'male');
			renderItems(filterByMale)
		})	
	}

	function filterByFemale(responseData){
		const inputFamale = document.getElementById('filter-by-female')

		inputFamale.addEventListener('change', () => {
			const filterByFemale = responseData.filter( item => item.gender == 'female');
			renderItems(filterByFemale)
		})	
	}

	function chooseBothGenders (responseData){
		const getBothGenders = document.getElementById('both-sexes')

		getBothGenders.addEventListener('change', () => {
			const chooseBoth = responseData
			renderItems(chooseBoth)
		})	
	}
		  
	const up = (a, b) => {
		return a < b ? -1 : 1;
	};

	const down = (a, b) => {
		return a > b ? -1 : 1;
	};

	function sortByName(responseData){
		const inputName = document.getElementById('sort-by-name-up')

		inputName.addEventListener('change', () => {
			const sortByname = responseData.sort((a, b) => up(a.name.first, b.name.first));
			renderItems(sortByname)
		})	
	}
	
	function sortByNameRevert(responseData){
		const inputNameRevert = document.getElementById('sort-by-name-down')
		
		inputNameRevert.addEventListener('change', () => {
			const sortByNameRevert = responseData.sort((a, b) => down(a.name.first, b.name.first));
			renderItems(sortByNameRevert)
		})		
	}
	
	function sortByAge(responseData){
		const inputAge = document.getElementById('sort-by-age-up')
		
		inputAge.addEventListener('change', () => {
			const sortByAge = responseData.sort((a, b) => up(a.dob.age, b.dob.age));
			renderItems(sortByAge)
		})	
	}
	
	function sortByAgeRevert(responseData){
		const inputAgeRevert = document.getElementById('sort-by-age-down')
		
		inputAgeRevert.addEventListener('change', () => {
			const sortByAgeRevert = responseData.sort((a, b) => down(a.dob.age, b.dob.age));
			renderItems(sortByAgeRevert)
		})	
	}

	searchByName(responseData)
	filterByFemale(responseData)
	filterByMale(responseData)
	chooseBothGenders(responseData)
	sortByName(responseData)
	sortByNameRevert(responseData)
	sortByAge(responseData)
	sortByAgeRevert(responseData)
}

// Render init data

function renderItems(responseData){
			
	content.innerHTML = ''
	
	responseData.forEach((item) => {	

		const createInstance = document.createElement('div');
		createInstance.classList.add('content__human');

		const userRemove = document.createElement('div');
		userRemove.classList.add('user-remove');
		userRemove.addEventListener('click',() => {
		document.getElementById('content').removeChild(createInstance)
		});

		const userFullName = document.createElement('h2');
		userFullName.classList.add('full-name')
		userFullName.textContent = capitalizeFirstLetter(item);	
		userFullName.appendChild(userRemove)
			
		const userPicture = document.createElement('div');
		userPicture.classList.add('user-picture');
		const image = document.createElement("img");
		image.setAttribute("src", item.picture.large);
		userPicture.appendChild(image);
	
		const userAge = document.createElement('h3');
		userAge.classList.add('user-age');
		userAge.textContent = `Age ${item.dob.age}`;

		const userEmail = document.createElement('h3');
		userEmail.classList.add('user-email');
		userEmail.textContent = `${item.email}`;
										
		const userLocation = document.createElement('h3');
		userLocation.classList.add('user-location');
		userLocation.textContent = `Curent city : ${item.location.city.charAt(0).toUpperCase() + item.name.first.slice(1)}`;		
										
		const userPhone = document.createElement('h3');
		userPhone.classList.add('user-phone');
		userPhone.textContent = `Phone : ${item.cell}`;	

		const userGender = document.createElement('h3');
		userGender.classList.add('user-gender');
		userGender.textContent = `${item.gender}`;

		if(item.gender === 'female'){
			userFullName.classList.add('full-name', 'female');
		}

		createInstance.append(userFullName, userPicture, userAge, userGender, userEmail,  userLocation, userPhone,);
		content.appendChild(createInstance);
	})

	function capitalizeFirstLetter(item){
		return `${item.name.first.charAt(0).toUpperCase() + item.name.first.slice(1)} ${item.name.last.charAt(0).toUpperCase() + item.name.last.slice(1)}`;
	}
}

// Navigathion menu

const navigateBtn = document.getElementById('navigate-menu')
const aside = document.getElementById('sortBar');
const asideBtn = document.getElementById('sortBarBtn');

navigateBtn.addEventListener('mousedown',(e) =>{

	aside.classList.toggle('aside-click');
	navigateBtn.classList.toggle('navigate-act');
	asideBtn.classList.toggle('sortBarBtn-active');
})

content.addEventListener('click', () => {
	aside.classList.remove('aside-click');
	asideBtn.classList.remove('sortBarBtn-active')
})





