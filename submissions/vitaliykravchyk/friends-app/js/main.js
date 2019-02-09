let data, filteredByGenderData, filteredBySearchData = [];
const search = document.querySelector('#search');
const sortByName = (data, type) => {
    data.sort(function(a,b){
        const name = getFullName(a.name.first, a.name.last);
        const nextName = getFullName(b.name.first, b.name.last)
        if(name > nextName){
            return type === 'reduce' ? 1 : -1;
        }
        if(name < nextName){
            return type === 'reduce' ? -1 : 1;        
        }
        return 0;
    });
    updateProfiles(data);
}
const sortByAge = (data, type) => {
    data.sort(function(a,b){
        const age = a.dob.age;
        const nextAge = b.dob.age
        return type === 'reduce' ? nextAge - age : age - nextAge;
    });
    updateProfiles(data);
}
const filteringProfilesByGender = () => {
    const gender = event.target.id;
    filteredByGenderData = gender === 'all' ? data : data.filter(elem => elem.gender === gender);
    filteredBySearchData = filteredByGenderData;
    updateProfiles(filteredByGenderData);
}
const filterBySearchData = () => {
    filteredBySearchData = filteredByGenderData.filter(elem => {
        return getFullName(elem.name.first, elem.name.last).toLowerCase().includes(event.target.value.toLowerCase())
    })
    updateProfiles(filteredBySearchData);
}
const createProfile = (user) => {
    const profile = document.createElement('figure');
    profile.classList.add('profile');
    
    const name = document.createElement('h4');
    if(user.gender === 'female') name.classList.add('female');
    name.innerHTML = getFullName(user.name.first, user.name.last);
    
    const image = document.createElement('img');
    image.src = user.picture.medium;
    
    const info = document.createElement('figcaption');
    info.innerHTML = '<span>' + user.dob.age + ' y.o.</span> ' + '<br>' + user.email + '<br><span>' + user.cell + '</span>' ;
    
    const gender = document.createElement('span');
    gender.classList.add('gender');
    gender.innerHTML = user.gender.toUpperCase();

    profile.appendChild(name);
    profile.appendChild(image);
    profile.appendChild(info);
    profile.appendChild(gender);
    document.querySelector('.container').appendChild(profile);
}
const deleteProfiles = () =>{
    document.querySelector('.container').remove();
    const container = document.createElement('div');
    container.classList.add('container');
    document.querySelector('main').appendChild(container);
}
const reset = () => {
    const radioButtons = document.querySelectorAll('input[type = radio]');
    radioButtons.forEach(elem => {
        elem.checked = elem.hasAttribute('checked');
    })
    search.value = '';
    updateProfiles(data);
    filteredByGenderData = data.slice(0);
}
const getFullName = (first, last) => {
    firstName = first.substring(0,1).toUpperCase() + first.substring(1);
    lastName = last.substring(0,1).toUpperCase() + last.substring(1);
    return firstName + ' ' + lastName;
}
const renderProfiles = users => {
    users.forEach(createProfile);
}
const updateProfiles = data => {
    deleteProfiles();
    renderProfiles(data);
}
fetch('https://randomuser.me/api/?results=50')
    .then(resp => resp.json())
    .then(users => {
        data = Array.from(users.results);
        filteredByGenderData = data.slice(0);
        filteredBySearchData = filteredByGenderData.slice(0);
        renderProfiles(data);
    })
document.querySelector('section').addEventListener('click', (event) => {
    const type = event.target.dataset.item;
    const button = event.target.id;
    switch(button){
        case 'male':
        case 'female':
        case 'all':
            filteringProfilesByGender();
            break;
        case 'age-increase':
        case 'age-reduce':
            sortByAge(filteredBySearchData, type);
            break;
        case 'name-increase':
        case 'name-reduce':
            sortByName(filteredBySearchData, type);
    }
});
search.addEventListener('keyup', filterBySearchData);
document.querySelector('#reset').addEventListener('click', reset);
