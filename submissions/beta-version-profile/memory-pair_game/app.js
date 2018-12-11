const card = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')
const container = document.querySelector('.card-deck')
const counter = document.querySelector('.moves')
const stars = document.querySelectorAll('.fa-star')
const starsList = document.querySelectorAll('.stars li')
const closeIcon = document.querySelector('.close')
const timer = document.querySelector('.timer')
const restartButton = document.querySelector('.restart')
const modalPlayAgainButton = document.querySelector('.play-again')

const DELAY = 500

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

  cards.forEach(card => {
    card.classList.remove('show', 'open', 'matching', 'disabled')
    container.appendChild(card)
  })

  openedCards = []

  moves = 0
  counter.innerHTML = moves

  stars.forEach(star => {
    star.classList.add('active')
  })

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
  }, DELAY)
}

const disable = () => {
  cards.forEach(card => card.classList.add('disabled'))
}

const enable = () => {
  let matchingCard = document.querySelectorAll('.matching')
  Array.from(cards)

  cards.filter(card => {
    card.classList.remove('disabled')
    matchingCard.forEach(item => item.classList.add('disabled'))
  })
}

const moveCounter = () => {
  moves++
  counter.innerHTML = moves

  const [firstStar, secondStar] = stars

  if (moves > 8 && moves < 12) {
    firstStar.classList.add('hidden')
  }

  if (moves > 13) {
    secondStar.classList.add('hidden')
  }
}

const startTimer = () => {
  interval = setInterval(() => {
    timer.innerHTML = `${minute} mins ${second} secs`
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
    if (openedCards[0].dataset.type === openedCards[1].dataset.type) {
      matching()
    } else {
      notMatching()
    }
  }
}

cards.forEach(card => {
  card.addEventListener('click', displayCard)
  card.addEventListener('click', cardOpen)
  card.addEventListener('click', congratulations)
})
