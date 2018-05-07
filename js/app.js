let pressUp = false,
    pressRight = false;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
      if (this.y === 60) {
        this.y = 225;
      } else if (this.y === 225) {
        this.y = 145;
      } else {
        this.y = 60;
      }
    }
    checkCollisions(player.x, player.y, allEnemies[0].x, allEnemies[0].y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x= x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  if (pressRight === true && this.x <= 350 ) {
    this.x  += 100;
    pressRight = false;
  } else if (pressUp === true && this.y >= 0) {
    this.y -= 90;
    pressUp = false;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
  console.log(this.x);
  console.log(this.y);
  if(keyPressed == 'up' && this.y >= 0) {
    // this.y -= 90;
    pressUp = true;
  } else if (keyPressed == 'down' && this.y <= 310) {
    this.y += 90;
  } else if (keyPressed === 'right') {
    // 505 - 65 = 440
    // this.x += 90;
    // player.update();
    pressRight = true;
  }  else if (keyPressed == 'left' && this.x >= 65) {
    this.x -= 100;
  }

};

// Now instantiate your objects.
const enemy1 = new Enemy(0, 60, 1);
// const enemy2 = new Enemy(200, 145, 200);
// const enemy3 = new Enemy(406, 225, 300);

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
// allEnemies.push(enemy2);
// allEnemies.push(enemy3);

console.log(allEnemies);

// Place the player object in a variable called player
const player = new Player(202, 400);



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

function checkCollisions(playerX, playerY, enemyX, enemyY) {
  if(playerX === 102 && playerY === 310) {
    console.log(`collisions ${playerX} ${playerY}`);

  }
}
