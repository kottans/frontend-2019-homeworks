const FRIENDS_API_URL = "https://randomuser.me/api/?results=20&nat=us";
const friendsContainer = document.getElementById("show-friends");
let listOfFriendsAll = [];

const showFriends = friends => {
	friendsContainer.innerHTML = "";
	friends.forEach(friend => {
		const friendContainer = document.createElement("div");
		let img = document.createElement("img");
		img.src = friend.picture.large;	
		let name  = document.createElement("p");
		name.textContent = (friend.name.first + " " + friend.name.last);
		name.classList.add("friend-name");		
		let age = document.createElement("p");
		age.textContent = "I have " + friend.dob.age + " years old";
		let loc = document.createElement("p");
		loc.textContent = friend.location.state + " " + friend.location.city;
		let email = document.createElement("div");
		email.textContent = friend.email;
		email.classList.add("email");
		friendContainer.append(img, name, age,loc, email); 
		friendContainer.classList.add("person-card");
		friendsContainer.append(friendContainer);
	});
}

const friendsListInit = listOfFriends => {
	if(listOfFriendsAll.length == 0)
		listOfFriendsAll = listOfFriends;	
	let filterParams = {
		gender: "",
		sortNameAge: "",
		searchFriend: ""
	};	
	addListenersToForm(filterParams);
	showFriends(listOfFriends);
}

const addListenersToForm = (filterParams) => {
	document.querySelector(".search-form").addEventListener("change", ({target}) => {
		if(target.name === "gender") {
			filterParams.gender = target.value;
		}
		if(target.name === "sort") {
			filterParams.sortNameAge = target.value;
		}
		filterFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector(".search-text").addEventListener("input", ({target}) => {
		filterParams.searchFriend = target.value;
		searchFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector("[type=reset]").addEventListener("click", () => {
		filterParams = {
			gender: "",
			sortNameAge: "",
			searchFriend: ""
		};
		showFriends(listOfFriendsAll);
	});
}

const searchFriends = (listOfFriends, filterParams) => {
	let filteredFriends = listOfFriends;
	if (filterParams.searchFriend)
    filteredFriends = filteredFriends.filter(
		({name}) => name.first.includes(filterParams.searchFriend) || name.last.includes(filterParams.searchFriend)
    );
	showFriends(filteredFriends);
}

const filterFriends = (listOfFriends, filterParams) => {
	let filteredFriends = listOfFriends;
	
	switch(filterParams.gender){
		case "male":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "male");
			break;
		case "female":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "female");
			break;
	}
	
 	switch(filterParams.sortNameAge){
		case "nameAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.name.first > friendNext.name.first ? 1 : -1);
			break;
 		case "nameDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.name.first < friendNext.name.first ? 1 : -1);
			break;
		case "ageAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.dob.age > friendNext.dob.age ? 1 : -1);
			break;
		case "ageDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.dob.age < friendNext.dob.age ? 1 : -1);
			break; 
	}
	showFriends(filteredFriends);
}

fetch(FRIENDS_API_URL)
	.then(response => response.json())
	.then(data => {
	friendsListInit(data.results)
	});
