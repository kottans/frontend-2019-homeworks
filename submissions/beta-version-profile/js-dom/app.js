import { data } from './data.js'

const ROUTER = {
  ABOUT: '#about',
  SLIDES: '#slides',
  TEAM: '#team',
  CONTACT: '#contact'
}
export default document.addEventListener('DOMContentLoaded', () => {
  const fragment = document.createElement('div')
  const main = document.querySelector('.content')
  const burger = document.querySelector('.menuBurger')
  const menu = document.querySelector('.menu')
  const hash = window.location.hash

  const renderContent = hash => {
    switch (hash) {
      case ROUTER.ABOUT:
        fragment.innerHTML = data.about
        break
      case ROUTER.SLIDES:
        fragment.innerHTML = data.slides
        break
      case ROUTER.TEAM:
        fragment.innerHTML = data.team
        break
      case ROUTER.CONTACT:
        fragment.innerHTML = data.contact
        break
      default:
        fragment.innerHTML = data.about
    }

    main.appendChild(fragment)
  }
  const handleClick = () => {
    menu.classList.toggle('active')
  }

  renderContent(hash)

  window.addEventListener('hashchange', event => {
    const {
      target: {
        location: { hash }
      }
    } = event

    renderContent(hash)
  })

  burger.addEventListener('click', handleClick)
})
