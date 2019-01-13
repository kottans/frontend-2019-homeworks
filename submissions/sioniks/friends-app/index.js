function createUser(firstName, lastName, age, tel, mail, city, img) {
  let user = document.createElement('div');
  user.classList.add('user-card');
  user.innerHTML = `
    <div class="user-image">
      <div class="icon" style="background-image: url(${img})"></div>
    </div>
    <div class="user-info">
      <h2 class="name">
        My name is - 
        <span>${firstName}</span>
        <span>${lastName}</span>
      </h2>
      <p class="age">I'm <span>${age}</span> years old</p>
      <p class="city">i live in <span>${city}</span></p>
      <div class="contact">
        <div class="tel">${tel}</div>
        <div class="mail">${mail}</div>
      </div>
    </div>
  `;
  let div = document.getElementById('users');
  div.appendChild(user);
}

function compareValue(a, b) {
  return a - b;
}

fetch('https://randomuser.me/api/?results=10')
  .then((resp) => resp.json())
  .then(function (data) {
    let users = data.results;
    return users.map(function (user) {
      let firstName = user.name.first,
        lastName = user.name.last,
        age = user.dob.age,
        tel = user.phone,
        mail = user.email,
        city = user.location.city,
        img = user.picture.thumbnail;
      createUser(firstName, lastName, age, tel, mail, city, img);
    });
  })
  .catch(function (error) {
    console.log(error);
  });