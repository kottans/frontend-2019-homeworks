// Mobile navigation
const menuBtn = document.querySelector('span.btn-menu');
const navBar = document.querySelector('nav');

menuBtn.addEventListener('click', function(e) {
  navBar.classList.toggle('open');
  e.stopPropagation();
});

document.querySelector('main').addEventListener('click', function() {
  if (navBar.className === "open") {
    navBar.classList.remove('open');
  }
});

var titlesText = [
  'The originator of the true fitted',
  'The Counterpart to the traditional 59FIFTY',
  'Classic Snapback Style',
  'Versatile Stretch-Fit Cap',
  'Relaxed Fit Adjustable'
];

var descriptionsText = [
  'New Era\'s flagship style and an icon in sport and street culture. It is worn on the field of play by athletes worldwide',
  'It is a true fitted style and is worn on the field of play by athletes worldwide.',
  'The shape of the 59FIFTY, but has an open back with a snap or strap closure.',
  'The shape and fabrics are engineered specifically for the 39THIRTY in order to provide the ultimate stretch-fit cap.',
  'It is a well worn, comfortable cap that sits low on your head, comes in One Size Fits Most sizing with a variety of closures.'
];

var stickersImgSrc = [
  'https://embed.widencdn.net/img/neweracap/sska6f40d1/exact/59FIFTY_STICKER.png',
  'https://embed.widencdn.net/img/neweracap/2hvmcuovvv/exact/LOW_PROFILE_59FIFTY_STICKER.png',
  'https://embed.widencdn.net/img/neweracap/aj71dyng4e/exact/9FIFTY_STICKER.png',
  'https://embed.widencdn.net/img/neweracap/x0jjdwxyzc/exact/39THIRTY_STICKER.png',
  'https://embed.widencdn.net/img/neweracap/hanevyz80t/exact/9TWENTY_STICKER.png'
];

var prevImgSrc = [
  'http://embed.widencdn.net/img/neweracap/fzydcwc01q/exact/MALE_5950_960_X_1010_3QL.png',
  'http://embed.widencdn.net/img/neweracap/3rxja9cksl/exact/MALE_LP5950_960_X_1010_3QL.png',
  'http://embed.widencdn.net/img/neweracap/fbdghwvl5k/exact/MALE_950_960_X_1010_3QL.png',
  'http://embed.widencdn.net/img/neweracap/fypppmypqf/exact/MALE_3930_960_X_1010_3QL.png',
  'http://embed.widencdn.net/img/neweracap/preplksr4l/exact/MALE_920_960_X_1010_3QL.png'
];

const mainContent = document.createElement('div');
mainContent.className = 'content';
document.querySelector('main').appendChild(mainContent);

mainContent.insertAdjacentHTML('afterbegin', '<div class="content-box"></div><div class="content-box"></div>');
const cBox = document.querySelectorAll('.content-box');

const ttl = document.createElement('h1');
ttl.className = 'title';
ttl.innerText = titlesText[0];
cBox[0].appendChild(ttl);

const dsc = document.createElement('p');
dsc.className = 'description';
dsc.innerText = descriptionsText[0];
cBox[0].appendChild(dsc);

const sticker = document.createElement('img');
sticker.setAttribute("src", stickersImgSrc[0]);
sticker.className = 'circle';
cBox[0].appendChild(sticker);

const preview = document.createElement('img');
preview.setAttribute("src", prevImgSrc[0]);
preview.className = 'photo';
cBox[1].appendChild(preview);

const menuItems = document.querySelectorAll('.menu-item');

for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', function() {
    ttl.innerText = titlesText[i];
    dsc.innerText = descriptionsText[i];
    sticker.setAttribute("src", stickersImgSrc[i]);
    preview.setAttribute("src", prevImgSrc[i]);
    menuItems.forEach(function(item) {item.classList.remove('isActive')});
    menuItems[i].classList.add('isActive');
  });
};
