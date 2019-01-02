const initDom = () => {
  const menu = document.querySelector('.menu')
  const menuItemCurrentClass = 'current'
  const menuContent = document.querySelector('.menu_content')
  const menuContentVisibilityClass = 'hidden'
  const menuToggle = document.querySelector('.menu_toggler')

  const populateMenu = (item, index) => {
    const menuItem = document.createElement('li')
    menuItem.innerHTML = item.title
    menuItem.dataset.name = item.id
    menu.appendChild(menuItem)

    if (index === 0) {
      menuItem.classList.add(menuItemCurrentClass)
    }
  }

  const populateMenuContent = (item, index) => {
    const menuItemContent = document.createElement('div')
    menuItemContent.innerHTML = item.text
    menuItemContent.className += `${item.id}_content menu_item_content`

    if (index > 0) {
      menuItemContent.classList.add(menuContentVisibilityClass)
    }

    menuContent.appendChild(menuItemContent)
  }

  const populateContent = () => {
    data.forEach((item, index) => {
      populateMenu(item, index)
      populateMenuContent(item, index)
    })
  }

  const switchMenuItem = ({ currentTarget }) => {
    const item = currentTarget
    const currentItemName = item.dataset.name

    // activate menu item
    document.querySelector(`.${menuItemCurrentClass}`).classList.remove(menuItemCurrentClass)
    item.classList.add(menuItemCurrentClass)

    // switch menu content
    document.querySelectorAll('.menu_item_content').forEach((el) => el.classList.add(menuContentVisibilityClass))
    document.querySelector(`.${currentItemName}_content`).classList.remove(menuContentVisibilityClass)
  }

  const toggleMenu = (e) => {
    menu.classList.toggle('menu-opened')
  }

  populateContent()

  document.querySelectorAll('.menu li').forEach((item) => item.addEventListener('click', switchMenuItem))

  menuToggle.addEventListener('click', toggleMenu)
}

document.addEventListener('DOMContentLoaded', initDom())
