let all_cats = [
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

function initial_cats() {
    let handler = function() {
        let cat_arr = document.querySelectorAll(".menu-item"),
            index = Array.prototype.indexOf.call(cat_arr, this);
            cat_title.textContent = all_cats[index].title;
            cat_img.setAttribute("src", all_cats[index].url);
    }

    all_cats.forEach(item => {
        let name = document.createElement('p');
        name.className = "menu-item";
        name.innerHTML = item.name;
        name.onclick = handler;
        menu.appendChild(name);
    })
    cat_title.textContent = all_cats[0].title;
    cat_img.setAttribute("src", all_cats[0].url);
};
initial_cats();
