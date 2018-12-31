let data = [
    {
        'title': 'Якорь',
        'img' : 'img/anchor.jpg',
        'info' : 'Такая борода в форме корабельного якоря получается при сочетании усов со шкиперской и козлиной бородками. Хорошо ухоженная, она идет практически всем.'
    },
    {
        'title' : 'Утиный хвост',
        'img' : 'img/ducktail.jpg',
        'info' : 'Эта борода, обязанная названием своей форме, действительно похожа на утиный хвост. В ее основу положена окладистая борода с частично выбритыми щеками, остро суживающаяся под подбородком. "Дактейл" оптимальна для настоящих индивидуалистов: она встречается чрезвычайно редко, зато выглядит очень стильно. Но, как и окладистая борода, "утиный хвост" тоже требует много терпения и тщательного ухода.'
    },
    {
        'title' : 'Борода Генриха IV',
        'img' : 'img/genrikh.jpg',
        'info' : 'Эта борода носит имя французского короля Генриха IV. Прекрасно отражает ее форму другое название - "бородка вокруг рта". Нежная, сексуальная и романтичная, она добавляет в облик человека нотки мужского эротизма и позволяет ему выглядеть элегантно. Людям с округлыми, полными лицами такая бородка не пойдет, а только подчеркнет недостатки их внешности.'
    },
];

function navItemSelected(value) {
    if (value.target.nodeName !==  "LI") {
        return;
    }
    const itemArr = document.querySelectorAll('.navigation__item');
    const contentArr = document.querySelectorAll('.content__item');
    itemArr.forEach(item => {
        item.classList.remove('navigation__item--active');
    })
    contentArr.forEach(item => {
        item.classList.remove('content__item--visible');
    })

    value.target.classList.add('navigation__item--active');
    console.log('clicked');
    itemArr.forEach((item, index) => {
        if (item.classList.contains('navigation__item--active')) {
            contentArr[index].classList.add('content__item--visible');
        }
    })
}

let itemBuild = document.querySelector('main');
data.forEach(value => {
    const navList = document.querySelector('.navigation__list');

    const item = document.createElement('li');
    item.textContent = value.title;
    item.classList.add('navigation__item');
    navList.appendChild(item);
})

data.forEach(value => {
    const wrapper = document.querySelector('.content__wrapper');
    
    let contentItem = document.createElement('div');
    contentItem.classList.add('content__item');
    wrapper.appendChild(contentItem);

    let contentHeader = document.createElement('h3');
    contentHeader.textContent = value.title;
    contentItem.appendChild(contentHeader);

    let contentImage = document.createElement('img');
    contentImage.setAttribute('src', value.img);
    contentItem.appendChild(contentImage);


    let contentInfo = document.createElement('p');
    contentInfo.textContent = value.info;
    contentItem.appendChild(contentInfo);
})

document.querySelector('.navigation__list').addEventListener('click', navItemSelected);

