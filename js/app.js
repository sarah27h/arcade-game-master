// Variables
let pressUp = false,
    pressDown = false,
    pressRight = false,
    pressLeft = false;

let collisionCounter = 0;

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
let res = '';
console.log(src);


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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.newX = this.speed * dt;
    this.x += this.newX;

    // prevent enemy disapper go out off canvas
    if (this.x >= 505) {
      this.x = 0;
      if (this.y === 137) {
        this.y = 220;
      } else if (this.y === 303) {
        this.y = 137;
      } else if (this.y === 220) {
        this.y = 303;
      }
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  if (pressUp === true && this.y >= 133) {
   this.y -= 83;
 } else if (pressDown === true && this.y <= 465) {
    this.y += 83;
  } else if (pressRight === true && this.x <= 350 ) {
    this.x  += 100;
  } else if (pressLeft === true && this.x >= 65) {
    this.x  -= 100;
  }

  pressUp = false;
  pressDown = false;
  pressRight = false;
  pressLeft = false;

  // check if player reach water and win
  if (this.y === 51) {
    console.log(`you win`);
    console.log(this.y);
    showGameModal();
  }

  player.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.checkCollisions = function(){
  for (const enemy of allEnemies) {
    if (player.x < enemy.x + enemy.width&&
     player.x + player.width> enemy.x &&
     player.y < enemy.y + enemy.height &&
     player.height + player.y > enemy.y) {
       console.log(Resources.get(this.sprite).width);
       console.log(`collisions ${player.x} ${player.y} ${enemy.x} ${enemy.y} ${player.height + player.y}`);
       collisionCounter++;
       player.begin();
    }
  }

}

Player.prototype.begin = function() {
    player.x = 220;
    player.y = 466;

    updateLives();
    console.log(`${collisionCounter} collisionCounter`);
}

function showGameModal() {
  console.log('congratulate  you win :)');
  // When the user clicks the button, open the modal
  // timer.stop();

  // show win modal
  if (collisionCounter <= 2) {
    modalMsg1.innerHTML = 'You Reach Water! :)';
    modalMsg2.innerHTML = 'Congratulations!';
  } else if (collisionCounter === 3){
    modalMsg1.innerHTML = 'Game Over :)';
    modalMsg2.innerHTML = '';
  }
  finalGameModal.style.cssText = 'display: block';
  modalScore.innerHTML = playerScore.innerHTML;
  console.log(playerScore.innerHTML, modalScore.innerHTML);

}

// add click event to icon to close the modal
closeIcon.addEventListener('click', resetGame);

// add click event to window any click outside of the modal close it
window.addEventListener('click', function(evt) {
    if (evt.target == finalGameModal) {
        resetGame();
    }

});

// show player-selector modal every time the browser reloads
window.addEventListener("load", function() {

});

startBtn.addEventListener('click', function() {
  selectorModal.style.cssText = 'display: none';
});

selectorModal.addEventListener('click', function(e) {
  if (e.target.nodeName.toLowerCase() === 'img') {
    src = e.target.getAttribute('src');

    res = src.replace('\\', '/');
    player.sprite = res;
    console.log(res);
    // console.log(Player.sprite);
  }
});

selectorModal.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13 && e.target.nodeName.toLowerCase() === 'img') {
      // 13 is enter
      // code for enter
      src = e.target.getAttribute('src');

      res = src.replace('\\', '/');
      player.sprite = res;
      console.log(res);
    }
});

replayBtn.addEventListener('click',resetGame);

function resetGame() {
  player.begin();
  collisionCounter = 0;
  for (heart of hearts) {
    heart.style.cssText = 'visibility: visible';
  }
  finalGameModal.style.cssText = 'display: none';
  selectorModal.style.cssText = 'display: block';
  playerScore.innerHTML = '0';
}

function updateLives() {
  if (collisionCounter === 1) {
    console.log(`heart must remove`);
    console.log(hearts);
    hearts[0].style.cssText = 'visibility: hidden';
  } else if (collisionCounter === 2) {
    hearts[1].style.cssText = 'visibility: hidden';
  } else if (collisionCounter === 3) {
    hearts[2].style.cssText = 'visibility: hidden';
    showGameModal();
    console.log('game over');
  }
}
