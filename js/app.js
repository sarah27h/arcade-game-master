/*
 *
 * variables
 *
 */
 const hearts = document.querySelectorAll('.heart');
 const replayBtn = document.querySelector('.replayBtn');
 const startBtn = document.querySelector('.startBtn');
 const closeIcon = document.querySelector(".close");
 const playerScore = document.querySelector('.player-score');
 const modalScore = document.querySelector('.modal-score');
 const modalMsg1 = document.querySelector('.modal-text1');
 const modalMsg2 = document.querySelector('.modal-text2');
 const finalGameModal = document.getElementById('gameModal');
 const selectorModal = document.getElementById('selectorModal');
 const playerImage = document.querySelector('.player-img');
 let src = playerImage.getAttribute('src');
 console.log(src);

//flags
let pressUp = false,
    pressDown = false,
    pressRight = false,
    pressLeft = false,
    collisionCounter = 0,
    score = 0,
    res = '';


/*
 *
 * Enemy class
 *
 */
 /**
* @description used to create enemy objects
* @constructor
* @param {number} x - position of enemy object at x axis
* @param {number} y - position of enemy object at y axis
* @param {number} speed - speed of enemy object
* @param {number} width
* @param {number} height
*/
// Enemies our player must avoid
var Enemy = function(x, y, speed, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-s.png';
};

/* * * * * * * * * * Enemy class methods * * * * * * * * * */
/**
* @description Update the enemy's position
* @param {number} dt - time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.newX = this.speed * dt;
    this.x += this.newX;

    // prevent enemy disapper go out off canvas
    if (this.x >= 505) {
      this.x = 0;

      // update enemy position
      if (this.y === 137) {
        this.y = 220;
      } else if (this.y === 303) {
        this.y = 137;
      } else if (this.y === 220) {
        this.y = 303;
      }
    }
};

/**
* @description Draw the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
 *
 * Player class
 *
 */
 /**
* @description used to create player objects
* @constructor
* @param {number} x - position of player object at x axis
* @param {number} y - position of player object at y axis
* @param {number} width
* @param {number} height
* @param {string} sprite - path of image to be drawn
*/
// Now write your own player class
var Player = function(x, y, width, height, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x= x;
    this.y = y;
    this.width = width;
    this.height = height;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
};

/* * * * * * * * * * Player class methods * * * * * * * * * */
// This class requires an update(), render() and
// a handleInput() method.
/**
* @description Update the player's position
*/
Player.prototype.update = function() {
  // update player position by step 83 if key pressed
  if (pressUp === true && this.y >= 133) {
   this.y -= 83;
 } else if (pressDown === true && this.y <= 465) {
    this.y += 83;
  } else if (pressRight === true && this.x <= 350 ) {
    this.x  += 100;
  } else if (pressLeft === true && this.x >= 65) {
    this.x  -= 100;
  }

  // set all key flags to false to recieve new presses
  pressUp = false;
  pressDown = false;
  pressRight = false;
  pressLeft = false;

  // check if player reach water and win
  if (this.y === 51) {
    console.log(`you win`);
    console.log(this.y);
    showGameModal();
    this.begin();
  }

  // after every update check if player touch enemy
  this.checkCollisions();
};

/**
* @description Draw the player on the screen
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Update the player's position
* @param {string} keyPressed - store string of key press by player
*/
Player.prototype.handleInput = function(keyPressed) {
  console.log(this.x);
  console.log(this.y);

  if(keyPressed == 'up') {
    pressUp = true;
  } else if (keyPressed == 'down') {
    pressDown = true;
  } else if (keyPressed === 'right') {
    pressRight = true;
  }  else if (keyPressed == 'left') {
    pressLeft = true;
  }

};

/**
* @description check if player touch enemy
*/
Player.prototype.checkCollisions = function(){

  for (const enemy of allEnemies) {
    if (this.x < enemy.x + enemy.width&&
     this.x + this.width> enemy.x &&
     this.y < enemy.y + enemy.height &&
     this.height + this.y > enemy.y) {
       console.log(Resources.get(this.sprite).width);
       console.log(`collisions ${this.x} ${this.y} ${enemy.x} ${enemy.y} ${this.height + this.y}`);

       collisionCounter++;
       // place player at start position
       this.begin();
    }
  }

}

/**
* @description place player at start position
*/
Player.prototype.begin = function() {
    this.x = 220;
    this.y = 466;
    updateLives();
    console.log(`${collisionCounter} collisionCounter`);
}


/*
 *
 *  instantiate objects
 *
 */
// Now instantiate your objects.
const enemy1 = new Enemy(202, 137, 100, 97, 65);
const enemy2 = new Enemy(200, 220, 120, 97, 65);
const enemy3 = new Enemy(406, 303, 150, 97, 65);

// function enemyArray(enemyNum) {
// 	const allEnemies = [];
//
// 	for(let i = 0; i < enemyNum-1; i++) {
//       allEnemies[i] = new Enemy()
//       allEnemies.push(allEnemies[i]);
// 	}
//
// 	console.log(allEnemies);
// }
// enemyArray(4);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

console.log(allEnemies);

// Place the player object in a variable called player
const player = new Player(220, 466, 65, 75, 'images/char-boy-s.png');


/*
 *
 *  Event Listeners
 *
 */

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', arrowKey);

// add click event to window any click outside of the modal close it
window.addEventListener('click', function(evt) {
    if (evt.target == finalGameModal) {
        resetGame();
    }

});

// add click event listener to icon to close the modal
closeIcon.addEventListener('click', resetGame);

// add click event listener to startBtn to close selector modal
startBtn.addEventListener('click', function() {
  selectorModal.style.cssText = 'display: none';
});

// add click event listener to replayBtn to start game
replayBtn.addEventListener('click',resetGame);

// add click event listener to selectorModal to select player by mouse
selectorModal.addEventListener('click', function(e) {
  if (e.target.nodeName.toLowerCase() === 'img') {
    src = e.target.getAttribute('src');

    res = src.replace('\\', '/');
    player.sprite = res;
    console.log(res);
    // console.log(Player.sprite);
  }
});

// add keypress event listener to selectorModal to select player by enter
selectorModal.addEventListener('keypress', function (e) {
    const key = e.which || e.keyCode;

    // 13 is enter
    if (key === 13 && e.target.nodeName.toLowerCase() === 'img') {
      // 13 is enter
      src = e.target.getAttribute('src');
      res = src.replace('\\', '/');
      player.sprite = res;
      console.log(res);
    }
});


/*
 *
 *  Functions
 *
 */
 /**
* @description restart game
*/
function resetGame() {
  player.begin();

  // reset flags
  collisionCounter = 0;
  score = 0;

  for (heart of hearts) {
    heart.style.cssText = 'visibility: visible';
  }

  finalGameModal.style.cssText = 'display: none';
  selectorModal.style.cssText = 'display: block';
  playerScore.innerHTML = '0';

  // allow key presses
  document.addEventListener('keyup', arrowKey);
}

/**
* @description store key presses and sends the keys to your
* Player.handleInput()
* @param {e} object - keyboard event
*/
function arrowKey(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

/**
* @description show game modal when user win or lose game by changing
* modalMsg1 & modalMsg2
* modalMsg1.innerHTML = 'You Reach Water! :)';
* modalMsg1.innerHTML = 'Game Over ):';
*/
function showGameModal() {
  console.log('congratulate  you win :)');

  // set win modal message
  if (collisionCounter <= 2) {
    score += 200;
    console.log(score.toString());
    playerScore.innerHTML = score.toString();
    console.log(score);
    modalMsg1.innerHTML = 'You Reach Water! :)';
    modalMsg2.innerHTML = 'Congratulations!';

  // set game over modal message
  } else if (collisionCounter === 3){
    modalMsg1.innerHTML = 'Game Over ):';
    modalMsg2.innerHTML = '';
    playerScore.innerHTML = '0';
  }

  // show final Game Modal
  finalGameModal.style.cssText = 'display: block';
  modalScore.innerHTML = playerScore.innerHTML;
  console.log(playerScore.innerHTML, modalScore.innerHTML);

  // prevent key presses when modal popup
  document.removeEventListener('keyup', arrowKey);
}

/**
* @description remove lives when player touch enemy
*/
function updateLives() {
  if (collisionCounter === 1) {
    hearts[0].style.cssText = 'visibility: hidden';
  } else if (collisionCounter === 2) {
    hearts[1].style.cssText = 'visibility: hidden';
  } else if (collisionCounter === 3) {
    hearts[2].style.cssText = 'visibility: hidden';

    // show game over modal
    showGameModal();
    console.log('game over');
  }
}
