/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var modal = document.querySelector('.modal');
var lvlContainer =  document.querySelector('.lvl');
var COFFICIENT = 1000;
var LVL = 1;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 700;

var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas element's height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    doc.querySelector('.canvasWrapper').appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / COFFICIENT;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);

        showStoneInfo();
        showRecord();
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt)
        checkPlayerFail()
        checkPlayerWin();
        checkPlayerGetHeart();
        checkPlayerDrowned();
        checkPlayerGetStone();
        checkStoneGetHeart();
        if(cannonball.visibility) {
            checkCannonballGetEnemy();
        }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        victory.update(dt);
        cannonball.update(dt);
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
            ],
            numRows = 7,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
        victory.render();
        heart.render();
        if(!player.stone) {
            stone.render();
        }
        cannonball.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
        location.reload();
    }

    function rebuild () {
        lvlContainer.innerText = LVL;
        allEnemies.forEach(function(el) {
            el.visibility = true;
        });
        if(player.lives <= 1) {
            heart.visibility = Math.round(Math.random());
            stone.visibility = Math.round(Math.random());
            heart.x = Math.random() * 300 + 150;
            heart.y = Math.random() * 200 + 150;
            stone.x = Math.random() * 300 + 150;
            stone.y = Math.random() * 200 + 150;
        }
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-cat-girl.png',
        'images/char-boy.png',
        'images/princess.png',
        'images/Heart.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Key.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

    function checkPlayerFail () {
        var cartoonDeffect = 70;

        allEnemies.forEach(function (el) {
            var status =  checkOnMet(el, player, cartoonDeffect);

            if(status && el.visibility && player.lives > 1) {
                el.visibility = false;
                player.lives = 1;
                player.sprite = 'images/char-cat-girl.png';
            } else {
                if(status && el.visibility) {
                    showModal("Sorry, but you are died :(");
                    localStorage.setItem('record', LVL);
                    reset();
                }
            }
        });
    }

    function checkPlayerDrowned () {
        if(player.y < 0) {
            var status = checkOnMet(victory, player, 70);

            if(!status) {
                showModal("Sorry, but you are drowned :(");
                reset();
            }
        }
    }

    function checkPlayerWin () {
        var status = checkOnMet(victory, player, 70);

        if (status) {
            showModal("Congratulation, you will go on next lvl :)");
            COFFICIENT = COFFICIENT/ 2;
            LVL += 1;
            player.x = Math.random() * CANVAS_WIDTH - 50;
            player.y = CANVAS_HEIGHT - player.bugs.imgHeight;
            rebuild();
        }
    }

    function checkPlayerGetHeart () {
        var status = checkOnMet(heart, player, 50);

        if (status  && heart.visibility == true) {
            player.lives = 2;
            player.sprite = 'images/char-horn-girl.png'
            heart.visibility = 0;
        }
    }

    function checkPlayerGetStone () {
        var cartoonDeffect = 70;
        var status = checkOnMet(stone, player, cartoonDeffect);

        if (status && stone.visibility == true) {
            showStoneInfo();
            player.stone = 1;
            player.stoneSprite = stone.sprite;
            stone.visibility = 0;
        }
    }

    function checkStoneGetHeart () {
        var cartoonDeffect = 70;
        var status = checkOnMet(stone, heart, cartoonDeffect);
        if (status && stone.visibility && heart.visibility) {
           stone.visibility = 0;
        }
    }
    
    function checkCannonballGetEnemy () {
        var cartoonDeffect = 70;

        allEnemies.forEach(function (el) {
            var status = checkOnMet(el, cannonball, cartoonDeffect);

            if(status && el.visibility && cannonball.visibility) {
                cannonball.visibility = false;
                el.visibility = false;
            }
        });
    }

    function checkOnMet (el1, el2, cartoonDeffect) {
        var status = 0;
        var checkHorizontal = Math.ceil(el1.x) + cartoonDeffect >= Math.ceil(el2.x) && Math.ceil(el1.x) - cartoonDeffect <= Math.ceil(el2.x);
        var checkVertical = Math.ceil(el1.y) + cartoonDeffect >= Math.ceil(el2.y) && Math.ceil(el1.y) - cartoonDeffect <= Math.ceil(el2.y);
        if (checkHorizontal && checkVertical) {
            status = 1;
        }

        return status;
    }

    function showStoneInfo() {
        var stoneQ = player.stone;
        var stoneInfoContainer = document.querySelector('.stoneinfo');

        if(stoneQ) {
            stoneInfoContainer.innerText = 'You have one stone!\n Press space and you will throw it :)';
        } else {
            stoneInfoContainer.innerText = 'You don\'t have stone, be careful!';
        }
    }

    function showModal(text) {
        modal.classList.add('isActive');
        var modalText = modal.querySelector('.modal__text');
        modalText.innerText = text;
        player.lock = 1;
        setTimeout(function () {
            modal.classList.remove('isActive');
            player.lock = 0;
        }, 1500);
    }

    function showRecord() {
        var recordContainer = document.querySelector('.record');
        var record = localStorage.getItem('record');
        if(record && recordContainer) {
            recordContainer.innerText = 'Record: ' + record;
        }
    }

})(this);
