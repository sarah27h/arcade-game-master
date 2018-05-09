let pressUp = false,
    pressDown = false,
    pressRight = false,
    pressLeft = false;


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
    player.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x= x;
    this.y = y;
    this.width = width;
    this.height = height;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  if (pressUp === true && this.y >= 0) {
   this.y -= 90;
   pressUp = false;
 } else if (pressDown === true && this.y <= 310) {
    this.y += 90;
    pressDown = false;
  } else if (pressRight === true && this.x <= 350 ) {
    this.x  += 100;
    pressRight = false;
  } else if (pressLeft === true && this.x >= 65) {
    this.x  -= 100;
    pressLeft = false;
  }

  // check if player reach water and win
  if (this.y === -50) {
    console.log(`you win`);
    console.log(this.y);
    setTimeout(function(){
      winModal();
      player.begin();
    }, 1000);

  }
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
const enemy1 = new Enemy(0, 60, 30, 97, 65);
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
const player = new Player(202, 400, 65, 75);



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

  if (player.x < allEnemies[0].x + allEnemies[0].width - 21 &&
   player.x + player.width + 19 > allEnemies[0].x &&
   player.y < allEnemies[0].y + allEnemies[0].height + 28 &&
   player.height - 36 + player.y > allEnemies[0].y) {
     console.log(Resources.get(this.sprite).width);
     console.log(`collisions ${player.x} ${player.y} width ${allEnemies[0].width} ${(allEnemies[0].width)+3}`);
     player.begin();
  }
}

Player.prototype.begin = function() {
  setTimeout(function(){
    player.x = 202;
    player.y = 400;

  }, 100);

}

// modal box
const modal = document.getElementById('conModal');
// closes the modal
const closeIcon = document.querySelector(".close");

function winModal() {
  console.log('congratulate  you win :)');
  // When the user clicks the button, open the modal
  // timer.stop();

  // show win modal
  modal.style.cssText = 'display: block';
}

// add click event to icon to close the modal
closeIcon.addEventListener('click', function() {
    modal.style.cssText = 'display: none';
});
