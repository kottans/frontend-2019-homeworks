export const fetchData = url => {
    return fetch(url)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.status);
        })
        .then(data => data.results);
};

const getInfo = user => {
    let info = document.createElement("div");
    info.classList.add("info");
    let gender = document.createElement("img");
    user.gender === "male" ? gender.setAttribute("src", "img/icon-male.png") : gender.setAttribute("src", "img/icon-female.png");
    info.innerHTML = `
        <ul>
            <li class='naming'>${user.name.first} ${user.name.last}</li>
            <li>${user.dob.age}</li>
            <li>${user.email}</li>
            <li>${gender.outerHTML}</li>
            <li>${user.phone}</li>
        </ul>`;
    return info;
};

const getPicture = user => {
    let picture = document.createElement("div");
    picture.classList.add("picture");
    let img = document.createElement("img");
    img.setAttribute("src", user.picture.large);
    picture.append(img);
    return picture;
};

export const generateCards = data => {
    let fragment = document.createDocumentFragment();
    data.forEach(user => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.append(getPicture(user));
        card.append(getInfo(user));
        fragment.append(card);
    });
    return fragment;
};
