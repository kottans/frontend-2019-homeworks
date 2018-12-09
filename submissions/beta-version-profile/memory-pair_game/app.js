let card = document.querySelectorAll('.card')
let modal = document.querySelector('.modal')
let container = document.querySelector('.card-deck')
let counter = document.querySelector('.moves')
let stars = document.querySelectorAll('.fa-star')
let starsList = document.querySelectorAll('.stars li')
let closeIcon = document.querySelector('.close')
let timer = document.querySelector('.timer')
const restartButton = document.querySelector('.restart')
const modalPlayAgainButton = document.querySelector('.play-again')

let cards = [...card]
let moves = 0

let openedCards = []

let second = 0,
  minute = 0,
  hour = 0

let interval

const shuffle = array => {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    let temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const reset = () => {
  modal.classList.remove('show')
  startGame()
}

document.body.onload = startGame()
restartButton.addEventListener('click', startGame)
modalPlayAgainButton.addEventListener('click', reset)

function startGame() {
  cards = shuffle(cards)

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('show', 'open', 'matching', 'disabled')
    container.appendChild(cards[i])
  }
  openedCards = []

  moves = 0
  counter.innerHTML = moves

  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = '#ffd700'
    stars[i].style.display = 'inline'
  }

  timer.innerHTML = '0 mins 0 secs'

  clearInterval(interval)
}

const matching = () => {
  openedCards[0].classList.add('matching', 'disabled')
  openedCards[1].classList.add('matching', 'disabled')
  openedCards[0].classList.remove('show', 'open')
  openedCards[1].classList.remove('show', 'open')
  openedCards = []
}

const notMatching = () => {
  openedCards[0].classList.add('not-matching')
  openedCards[1].classList.add('not-matching')
  disable()
  setTimeout(() => {
    openedCards[0].classList.remove('show', 'open', 'not-matching')
    openedCards[1].classList.remove('show', 'open', 'not-matching')
    enable()
    openedCards = []
  }, 500)
}

const disable = () => {
  cards.forEach(card => card.classList.add('disabled'))
}

const enable = () => {
  let matchingCard = document.querySelectorAll('.matching')
  Array.prototype.filter.call(cards, card => {
    card.classList.remove('disabled')

    for (let i = 0; i < matchingCard.length; i++) {
      matchingCard[i].classList.add('disabled')
    }
  })
}

const moveCounter = () => {
  moves++
  counter.innerHTML = moves

  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.display = 'none'
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.display = 'none'
      }
    }
  }
}

const startTimer = () => {
  interval = setInterval(() => {
    timer.innerHTML = minute + ' mins ' + second + ' secs'
    second++
    if (second == 60) {
      minute++
      second = 0
    }
    if (minute == 60) {
      hour++
      minute = 0
    }
  }, 1000)
}

const congratulations = () => {
  let matchingCard = document.querySelectorAll('.matching')

  if (matchingCard.length == 16) {
    clearInterval(interval)
    let finalTime = timer.innerHTML

    modal.classList.add('show')
    let starRating = document.querySelector('.stars').innerHTML

    document.querySelector('.final-moves').innerHTML = moves
    document.querySelector('.star-rating').innerHTML = starRating
    document.querySelector('.total-time').innerHTML = finalTime

    closeModal()
  }
}

const closeModal = () => {
  closeIcon.addEventListener('click', () => {
    modal.classList.remove('show')
    startGame()
  })
}

function displayCard() {
  this.classList.toggle('open')
  this.classList.toggle('show')
  this.classList.toggle('disabled')
}

function cardOpen() {
  openedCards.push(this)
  let len = openedCards.length

  if (len == 1 && moves == 0) {
    second = 0
    minute = 0
    hour = 0
    startTimer()
  } else if (len === 2) {
    moveCounter()
    if (openedCards[0].type === openedCards[1].type) {
      matching()
    } else {
      notMatching()
    }
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', displayCard)
  cards[i].addEventListener('click', cardOpen)
  cards[i].addEventListener('click', congratulations)
}
