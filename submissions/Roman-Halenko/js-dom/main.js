const menuBtn = document.getElementById('btn-menu');
const navBar = document.getElementById('navbar');
const main = document.getElementsByTagName('main')[0];
const menuItems = document.querySelectorAll('.menu-item');
const menuList = document.querySelector('#navbar ul');

// Mobile navigation
menuBtn.addEventListener('click', e => {
  navBar.classList.toggle('open');
  e.stopPropagation();
});

main.addEventListener('click', () => {
  if (navBar.className === "open") {
    navBar.classList.remove('open');
  }
});

const data = [
  {
  title: 'The originator of the true fitted',
  description: 'New Era\'s flagship style and an icon in sport and street culture. It is worn on the field of play by athletes worldwide',
  stickerImg: 'https://embed.widencdn.net/img/neweracap/sska6f40d1/exact/59FIFTY_STICKER.png',
  prevImg: 'http://embed.widencdn.net/img/neweracap/fzydcwc01q/exact/MALE_5950_960_X_1010_3QL.png'
  },
  {
  title: 'The Counterpart to the traditional 59FIFTY',
  description: 'It is a true fitted style and is worn on the field of play by athletes worldwide.',
  stickerImg: 'https://embed.widencdn.net/img/neweracap/2hvmcuovvv/exact/LOW_PROFILE_59FIFTY_STICKER.png',
  prevImg: 'http://embed.widencdn.net/img/neweracap/3rxja9cksl/exact/MALE_LP5950_960_X_1010_3QL.png'
  },
  {
  title: 'Classic Snapback Style',
  description: 'The shape of the 59FIFTY, but has an open back with a snap or strap closure.',
  stickerImg: 'https://embed.widencdn.net/img/neweracap/aj71dyng4e/exact/9FIFTY_STICKER.png',
  prevImg: 'http://embed.widencdn.net/img/neweracap/fbdghwvl5k/exact/MALE_950_960_X_1010_3QL.png'
  },
  {
  title: 'Versatile Stretch-Fit Cap',
  description: 'The shape and fabrics are engineered specifically for the 39THIRTY in order to provide the ultimate stretch-fit cap.',
  stickerImg: 'https://embed.widencdn.net/img/neweracap/x0jjdwxyzc/exact/39THIRTY_STICKER.png',
  prevImg: 'http://embed.widencdn.net/img/neweracap/fypppmypqf/exact/MALE_3930_960_X_1010_3QL.png'
  },
  {
  title: 'Relaxed Fit Adjustable',
  description: 'It is a well worn, comfortable cap that sits low on your head, comes in One Size Fits Most sizing with a variety of closures.',
  stickerImg: 'https://embed.widencdn.net/img/neweracap/hanevyz80t/exact/9TWENTY_STICKER.png',
  prevImg: 'http://embed.widencdn.net/img/neweracap/preplksr4l/exact/MALE_920_960_X_1010_3QL.png'
  }
];

const mainContent = document.createElement('div');
mainContent.className = 'content';
main.appendChild(mainContent);

mainContent.insertAdjacentHTML('afterbegin', '<div class="content-box"></div><div class="content-box"></div>');
const cBox = document.querySelectorAll('.content-box');

const ttl = document.createElement('h1');
ttl.className = 'title';
ttl.innerText = data[0].title;
cBox[0].appendChild(ttl);

const dsc = document.createElement('p');
dsc.className = 'description';
dsc.innerText = data[0].description;
cBox[0].appendChild(dsc);

const sticker = document.createElement('img');
sticker.setAttribute("src", data[0].stickerImg);
sticker.className = 'circle';
cBox[0].appendChild(sticker);

const preview = document.createElement('img');
preview.setAttribute("src", data[0].prevImg);
preview.className = 'photo';
cBox[1].appendChild(preview);

function makeActive(trg, elements) {
  elements.forEach(elem => {elem.classList.remove('isActive')});
  trg.classList.add('isActive');
}

menuList.addEventListener('click', (ev) => {
  for (let i = 0; i < menuItems.length; i++) {
    if (ev.target === menuItems[i]) {
      ttl.innerText = data[i].title;
      dsc.innerText = data[i].description;
      sticker.setAttribute("src", data[i].stickerImg);
      preview.setAttribute("src", data[i].prevImg);
      makeActive(ev.target, menuItems);
    }
  }
});
