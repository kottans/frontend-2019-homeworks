import Resources from './resources.js'
import { ctx } from './engine.js'

let score = 0
let gameLevel = 1
const allEnemies = []
const scoreLevelDiv = document.createElement('div')
class Player {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/char-boy.png'
  }
  update() {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    displayScoreLevel(score, gameLevel)
  }

  handleInput(keyPress) {
    if (keyPress == 'left') {
      player.x -= player.speed
    }
    if (keyPress == 'up') {
      player.y -= player.speed - 20
    }
    if (keyPress == 'right') {
      player.x += player.speed
    }
    if (keyPress == 'down') {
      player.y += player.speed - 20
    }
    console.log('keyPress is: ' + keyPress)
  }
}

class Enemy {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/enemy-bug.png'
  }
  update(dt) {
    this.x += this.speed * dt
    if (this.x >= 505) {
      this.x = 0
    }

    checkCollision(this)
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}
const player = new Player(202.5, 383, 50)
const enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)

const displayScoreLevel = (aScore, aLevel) => {
  const canvas = document.getElementsByTagName('canvas')
  const firstCanvasTag = canvas[0]

  scoreLevelDiv.innerHTML = `Score:  ${aScore} / Level: '${aLevel}`
  document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0])
}

const checkCollision = function(anEnemy) {
  if (
    player.y + 131 >= anEnemy.y + 90 &&
    player.x + 25 <= anEnemy.x + 88 &&
    player.y + 73 <= anEnemy.y + 135 &&
    player.x + 76 >= anEnemy.x + 11
  ) {
    player.x = 202.5
    player.y = 383
  }

  if (player.y + 63 <= 0) {
    player.x = 202.5
    player.y = 383
    console.log('you made it!')

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 505, 171)

    score += 1
    gameLevel += 1
    console.log('current score: ' + score + ', current level: ' + gameLevel)
    increaseDifficulty(score)
  }

  if (player.y > 383) {
    player.y = 383
  }
  if (player.x > 402.5) {
    player.x = 402.5
  }
  if (player.x < 2.5) {
    player.x = 2.5
  }
}

const increaseDifficulty = function(numEnemies) {
  // remove all previous enemies on canvas
  allEnemies.length = 0

  // load new set of enemies
  for (var i = 0; i <= numEnemies; i++) {
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)

    allEnemies.push(enemy)
  }
}

allEnemies.push(enemy)

document.addEventListener('keydown', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }

  player.handleInput(allowedKeys[e.keyCode])
  console.log(allowedKeys[e.keyCode])
})

export { allEnemies, player }
