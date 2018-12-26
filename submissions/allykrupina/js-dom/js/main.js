let allCats = [
    {
        name: 'Pushok',
        url: 'img/ember-ivory-433863-unsplash.jpg',
        title: 'Playful Pushok'
    },
    {
        name: 'Grey',
        url: 'img/marko-blazevic-219788-unsplash.jpg',
        title: 'Funny Grey'
    },
    {
        name: 'Lola',
        url: 'img/mikhail-vasilyev-253977-unsplash.jpg',
        title: 'Timid Lola'
    },
    {
        name: 'Assol',
        url: 'img/paul-hanaoka-369631-unsplash.jpg',
        title: 'Kind Assol'
    },
    {
        name: 'Jack',
        url: 'img/paul-hanaoka-369632-unsplash.jpg',
        title: 'Brave Jack'
    },
    {
        name: 'Nora',
        url: 'img/yerlin-matu-481826-unsplash.jpg',
        title: 'Selfish Nora'
    }
]

function showCats() {
    drowOneCat = (index) => {
        cat_title.textContent = allCats[index].title;
        cat_img.setAttribute("src", allCats[index].url);
    }
    allCats.forEach((item, index) => {
        let name = document.createElement('p');
        name.innerHTML = item.name;
        name.addEventListener("click", drowOneCat.bind(null, index));
        menu.appendChild(name);
    })
    drowOneCat(0);
};
showCats();
