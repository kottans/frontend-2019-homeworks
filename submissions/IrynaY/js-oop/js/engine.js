var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        gameInfo = doc.getElementById('info_line'),
        lives = doc.getElementById('live'),
        score = doc.getElementById('score'),
        level = doc.getElementById('level'),
        p = doc.createElement('p'),
        lastTime

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGTH;
    doc.body.appendChild(canvas);
    p.innerText ='Press space to change sprite'
    doc.body.appendChild(p)

    function main() {
        if(player.lives === 0){
            doc.body.removeChild(canvas)
            doc.body.removeChild(p)
            gameInfo.innerText = 'GAME OVER'
            gameInfo.classList.toggle('game_over');
        } else {
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
            update(dt);
            render();
            lastTime = now;
            win.requestAnimationFrame(main);
        }
    }

    function init() {
        reset()
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions(){
        allEnemies.forEach(enemy => {
            if(Math.ceil(enemy.x) + CELL_HEIGHT >= player.x && Math.ceil(enemy.x) - CELL_HEIGHT <= player.x
                && Math.ceil(enemy.y) + 15 >= player.y && Math.ceil(enemy.y) - 15<= player.y)
            {
                player.lives--
                player.x = 201
                player.y = 407
            }
        })

        if(gem.visible && gem.x+10 >= player.x && gem.x -10<= player.x
            && gem.y +45>= player.y && gem.y-45<= player.y)
        {
            gem.visible = false
            setInterval(() => {
                gem.visible = true
            }, 2000)
            player.score += 15
        }

        if(heart.visible && heart.x+10 >= player.x && heart.x -10<= player.x
            && heart.y +45>= player.y && heart.y-45<= player.y)
        {
            heart.visible = false
            setInterval(() => {
                heart.visible = true
            }, 20000)
            player.lives++
        }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt)
        });
        gem.update()
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        ctx.drawImage(Resources.get('images/Selector.png'), (numCols-3) * 101, (row-1) * 83);
        renderEntities();
        lives.innerText = player.lives
        score.innerText = player.score
        level.innerText = game_lavel
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {enemy.render()});
        player.render();
        gem.render();
        heart.render();
    }

    function reset() {
        game_lavel = 1;
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/Selector.png',
        'images/enemy-bug.png',
        'images/Gem Green.png',
        'images/Heart.png',
        ...SPRITES
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
