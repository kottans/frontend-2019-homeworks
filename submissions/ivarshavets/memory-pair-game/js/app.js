const initGame = () => {
	const DELAY = 600
	const cardsHolder = document.querySelector('.cards-holder')
	const cards = [...data, ...data]
	const cardActiveClass = 'card--active'

	const renderCards = (cards) => {
		cards.sort(() => 0.5 - Math.random())

		cards.forEach(card => {
			const cardEl = document.createElement('div')
			cardEl.setAttribute('class', 'card')
			cardEl.setAttribute('data-name', card.id)

			const img = document.createElement('img')
			img.setAttribute('class', 'card__img')
			img.setAttribute('src', card.image)

			cardEl.appendChild(img)
			cardsHolder.appendChild(cardEl)
		})
	}

	const isCardsMatch = (array) => {
		return array[0].dataset.name === array[1].dataset.name
	}

	let openCards = []
	let allCheckedCards = []

	const handleCardsVisibility = ({currentTarget}) => {
		const item = currentTarget

		openCards.push(item)
		item.classList.add(cardActiveClass)

		if ((openCards.length === 2) && isCardsMatch(openCards)) {
			setTimeout(() => {
				openCards.forEach((el) => el.classList.add('hidden'))
			}, DELAY)
			allCheckedCards = allCheckedCards.concat(openCards)
		}

		if (openCards.length === 2) {
			setTimeout(() => {
				openCards.forEach((el) => el.classList.remove(cardActiveClass))
				openCards = []
			}, DELAY)
		}

		if (allCheckedCards.length === cards.length) {
			setTimeout(() => {
				showFinalMessage()
			}, DELAY * 2)
		}
	}

	const showFinalMessage = () => {
		alert('You won!')
		location.reload()
	}

	renderCards(cards)

	const cardsNodeList = document.querySelectorAll('.card')
	cardsNodeList.forEach((card) => {
		card.addEventListener('click', handleCardsVisibility)
	})
}

document.addEventListener('DOMContentLoaded', initGame())
