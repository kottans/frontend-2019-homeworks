const data = [
  {
    title: 'Architecture',
    description:
      'Lego Architecture is a sub-brand and product range of the Lego construction toy, which aims to “celebrate the past, present and future of architecture through the Lego Brick”. The brand includes a series of Lego sets designed by ‘Architectural Artist’ Adam Reed Tucker, and each contain the pieces and instructions to build a model of a famous architectural building in micro-scale. Adam Reed Tucker earned a degree in architecture at Kansas State University in 1996. While there, he sought a method to join his two passions of art and architecture, and hit upon the idea of using Lego bricks. From this, he founded Brickstructures, Inc., and began to design and build models of famous landmarks. His work was noticed by the Lego Group, and together they formed a partnership to release some of his models as commercially available Lego sets under the Lego Architecture brand.',
    image: 'architecture.png'
  },
  {
    title: 'City',
    description:
      'Lego City is a theme under which Lego building sets are released. As the name suggests, Lego City sets are based on city life, with the models depicting city and emergency services (such as police and fire), airport, train, construction, and civilian services.',
    image: 'city.png'
  },
  {
    title: 'Duplo',
    description:
      'Duplo (trademarked as DUPLO) is a product range of the construction toy Lego, designed for children aged 1½ to 5 years old. Duplo bricks are twice the length, height and width of traditional Lego bricks, making them easier to handle and less likely to be swallowed by younger children. Despite their size, they are still compatible with traditional Lego bricks. Initially launched in 1969, the Duplo range has gone on to include sets with figures, cars, houses and trains. Duplo is manufactured in Nyíregyháza, Hungary.',
    image: 'duplo.png'
  },
  {
    title: 'Minecraft',
    description:
      'Lego Minecraft is a Lego theme based on the sandbox video game Minecraft. The earlier "Micro World" sets feature a group of four interlocking scenes that can be rearranged, with two having a removable surface with caves containing ores, underground rivers, and a minecart track, it also includes characters which can be moved around like normal Lego. The later sets feature brick-built locations with primitive brick types (in order to remain faithful to Minecraft\'s blocky aesthetics), often on base plates raised by bricks, to allow for inter-connectivity with other sets. These sets are all of a minifigure scale, with custom moulds for the character heads, tools and certain body parts (for example the Creeper, which consists of primarily a single moulded piece for its torso and legs).',
    image: 'minecraft.png'
  },
  {
    title: 'Ninjago',
    description:
      'Lego Ninjago is a Lego theme introduced in 2011. It is the first to be based on ninja since the discontinuation of the Ninja subtheme of the Castle line in 2000. Whilst it retains some elements of this previous theme, one of the main differences is a more detailed accompanying story, primarily underpinned by a closely linked TV series, Ninjago: Masters of Spinjitzu. The theme enjoyed popularity and success in its first year, and a further two years were commissioned before a planned discontinuation in 2013. However, after a brief hiatus, the line was revived after feedback from fans and has been in production ever since.',
    image: 'ninjago.png'
  }
];

function onNavSelect(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }

  document.querySelectorAll('.nav__item').forEach(card => {
    card.classList.remove('nav__item--active');
  });
  event.target.classList.add('nav__item--active');

  const idx = event.target.dataset.indexNumber;

  document.querySelectorAll('.content__item--visible').forEach(card => {
    card.classList.remove('content__item--visible');
  });

  const content = document.querySelector(`.content__item[data-index-number="${idx}"]`);
  content.classList.toggle('content__item--visible');

  document.querySelector('.nav').classList.remove('nav--visible');
}

const navigation = document.querySelector('.nav');
const main = document.querySelector('.main');

const ul = document.createElement('ul');
ul.classList.add('nav__inner');
ul.addEventListener('click', onNavSelect);

data.forEach((menuItem, idx) => {
  const li = document.createElement('li');
  li.dataset.indexNumber = idx;
  li.innerText = menuItem.title;
  li.classList.add('nav__item');
  ul.appendChild(li);

  const content = document.createElement('div');
  content.classList.add('content__item');

  const text = document.createElement('p');
  text.innerText = menuItem.description;

  const image = document.createElement('img');
  image.setAttribute('src', `img/${menuItem.image}`);

  content.appendChild(image);
  content.appendChild(text);
  content.dataset.indexNumber = idx;

  main.appendChild(content);
});

navigation.appendChild(ul);

document
  .querySelector('.nav__item')
  .dispatchEvent(new MouseEvent('click', { view: window, bubbles: true }));

document.querySelector('.header__burger').addEventListener('click', () => {
  navigation.classList.toggle('nav--visible');
});
