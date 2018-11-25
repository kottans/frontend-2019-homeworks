import Resources from './resources.js'
import { allEnemies, player } from './app.js'

const canvas = document.createElement('canvas')
export const ctx = canvas.getContext('2d')

let lastTime = 0

canvas.width = 505
canvas.height = 606
document.body.appendChild(canvas)

const main = () => {
  const now = Date.now(),
    dt = (now - lastTime) / 1000.0

  update(dt)
  render()

  lastTime = now

  window.requestAnimationFrame(main)
}

const init = () => {
  reset()
  lastTime = Date.now()
  main()
}

const update = dt => {
  updateEntities(dt)
  checkCollisions()
}

const updateEntities = dt => {
  allEnemies.forEach(function(enemy) {
    enemy.update(dt)
  })

  if (Math.round(player.y / 80) === 0) {
    player.update()
  }

  document.getElementById('score').innerHTML = player.score
}

const checkCollisions = () => {
  allEnemies.forEach(enemy => {
    if (
      Math.round(enemy.x / 100) === Math.round(player.x / 100) &&
      Math.round(enemy.y / 80) === Math.round(player.y / 80)
    ) {
      player.reset()
    }
  })
}

function render() {
  var rowImages = [
      'images/water-block.png', // Top row is water
      'images/stone-block.png', // Row 1 of 3 of stone
      'images/stone-block.png', // Row 2 of 3 of stone
      'images/stone-block.png', // Row 3 of 3 of stone
      'images/grass-block.png', // Row 1 of 2 of grass
      'images/grass-block.png', // Row 2 of 2 of grass
    ],
    numRows = 6,
    numCols = 5,
    row,
    col

  for (row = 0; row < numRows; row++) {
    for (col = 0; col < numCols; col++) {
      ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83)
    }
  }

  renderEntities()
}

function renderEntities() {
  allEnemies.forEach(function(enemy) {
    enemy.render()
  })

  player.render()
}

function reset() {}

Resources.load([
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/char-boy.png',
])

Resources.onReady(init)
