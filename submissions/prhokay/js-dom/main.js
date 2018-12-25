const data = [
  {
    id: 'London',
    text: 'London is the capital city of England.',
  },
  {
    id: 'Paris',
    text: 'Paris is the capital of France.',
  },
  {
    id: 'Tokyo',
    text: 'Tokyo is the capital of Japan.',
  },
];

const mainContent = document.getElementById('main');

document.querySelectorAll('.nav-link').forEach(registerMenuLinkClickEventListener);

function registerMenuLinkClickEventListener(el) {
  el.addEventListener('click', event => {
    const city = data.find(obj => obj.id === event.currentTarget.dataset.city);
    mainContent.innerHTML = city.text;
  });
};
