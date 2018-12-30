const RANDOM_DATA = 'https://randomuser.me/api/?results=60'
const GET_RANDOM_DATA = fetch(RANDOM_DATA)

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
		const inputMale = document.getElementById('filter-by-female')

		inputMale.addEventListener('change', () => {
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
		if (a < b) {
			return -1;
		}else{
			return 1;
		}
	};

	const down = (a, b) => {
		if (a < b) {
			return 1;
		}else{
			return -1;
		}
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
				
	const friendsAbout = document.createElement('div');
	friendsAbout.classList.add('content__human');
									
	const userRemove = document.createElement('div');
	userRemove.classList.add('user-remove');
	userRemove.addEventListener('click',() =>{
	document.getElementById('content').removeChild(friendsAbout)
	});

	const userFullName = document.createElement('p');
	userFullName.classList.add('full-name')
	userFullName.textContent = `${item.name.first.charAt(0).toUpperCase() + item.name.first.slice(1)} ${item.name.last.charAt(0).toUpperCase() + item.name.last.slice(1)}`;
		
	userFullName.appendChild(userRemove)
		
	const userPicture = document.createElement('div');
	userPicture.classList.add('user-picture');
	const image = document.createElement("img");
	image.setAttribute("src", item.picture.large);
	userPicture.appendChild(image);

	const userAge = document.createElement('p');
	userAge.classList.add('user-age');
	userAge.textContent = `Age ${item.dob.age}`;

	const userGender = document.createElement('p');
	userGender.classList.add('user-gender');
	userGender.textContent = `${item.gender}`;

		if(item.gender === 'female'){
			userFullName.classList.add('full-name', 'female');
		}
									
	const userEmail = document.createElement('p');
	userEmail.classList.add('user-email');
	userEmail.textContent = `${item.email}`;
									
	const userLocation = document.createElement('p');
	userLocation.classList.add('user-location');
	userLocation.textContent = `Curent city : ${item.location.city.charAt(0).toUpperCase() + item.name.first.slice(1)}`;		
									
	const userPhone = document.createElement('p');
	userPhone.classList.add('user-phone');
	userPhone.textContent = `Phone : ${item.cell}`;

	friendsAbout.append(userFullName, userPicture, userAge, userGender, userEmail,  userLocation, userPhone,);
									
	content.appendChild(friendsAbout);

	})
}

// Navigathion menu

const navigateBtn = document.getElementById('navigate-menu')
const aside = document.getElementById('sortBar');
const asideBtn = document.getElementById('sortBarBtb');

navigateBtn.addEventListener('mousedown',(e) =>{

	aside.classList.toggle('aside-cklick');
	navigateBtn.classList.toggle('navigate-act');
	asideBtn.classList.toggle('sortBarBtb-active');
})

content.addEventListener('click', () => {
	aside.classList.remove('aside-cklick');
	asideBtn.classList.remove('sortBarBtb-active')
})





