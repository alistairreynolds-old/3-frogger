// Constants
var COL_WIDTH = 101;
var ROW_HEIGHT = 83;
var BOTTOM_ROW_EXTRA = 94;
var MAX_LOCS = {'bottom': 327, 'top': 78, 'left': 1, 'right': 303, 'middle': 150};   // max locs there so we can stop the player jumping off the screen, and middle so we have a decent minimum point at where to add more enemies
var startingLoc = {
    'player':getCoords(2,5),
    'enemy1':getCoords(0,1),
    'enemy2':getCoords(0,2),
    'enemy3':getCoords(0,3),
    'enemy4':getCoords(0,Math.floor(Math.random() * (4 - 1)) + 1), // Additional enemy on a random row
};
var SQUISH = new Audio('sounds/squish.mp3');         //http://soundbible.com/677-Squish-Fart.html        http://stackoverflow.com/questions/1933969/sound-effects-in-javascript-html5
var PLAYER_PADDING = 20;   // This is to add into the x value of character collision to make it hit the edge of the character as opposed to the character's grid reference

// Various speed settins for random speed generation, and automatic difficulty changing
var MIN_MIN_SPEED = 3;
var MIN_MAX_SPEED = 5;
var MAX_MIN_SPEED = 10;
var MAX_MAX_SPEED = 25;
var maxSpeed = 15;
var minSpeed = 5;


// Enemies our player must avoid
var Enemy = function(number,x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set starting position and speed
    this.x = x;
    this.y = y;
    this.number = number;
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 1 * dt * this.speed * 50;   // +1 needed so that we don't multiply starting position of 0 so they actually start moving
    this.render();
    if(this.x >= MAX_LOCS.right + (COL_WIDTH * 2)){   // Detect if off the screen
        if(Math.random() * (50 - 1) + 1 >= 48){     // Make spawning of new enemies a bit more random
            this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;           // Random speed change if needed for difficulty change
            if(this.number > 3){                   // Last enemy spawn on new random line
                this.y = (getCoords(0,Math.floor(Math.random() * (4 - 1)) + 1).y);
            }
            this.x = 0 - COL_WIDTH;
        }
    }
    // Check for character collision. +
    var xMin = this.x - COL_WIDTH + PLAYER_PADDING;
    var xMax = this.x + COL_WIDTH - PLAYER_PADDING;
    if((player.y == this.y) && (player.x > xMin) && (player.x < xMax)){
        player.x = startingLoc.player.x;
        player.y = startingLoc.player.y;
        player.render();
        SQUISH.play();
        player.deaths --;
        player.loseCounter ++;
        player.calculateDifficulty();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    // Score and Deaths is total number. Counter is to adjust the difficulty based on win and lose streaks
    this.score = 0;
    this.deaths = 0;
    this.winCounter = 0;
    this.loseCounter = 0;
    this.update = function(){
    };
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
    };
    this.handleInput = function(key){
        switch(key){
            case 'up':
                if(this.y >= MAX_LOCS.top){
                    this.y -= ROW_HEIGHT;
                }else{
                    // game win
                    this.score ++;
                    this.winCounter ++;
                    this.calculateDifficulty();
                    this.x = startingLoc.player.x;
                    this.y = startingLoc.player.y;
                }
                break;
            case 'down':
                if(this.y <= MAX_LOCS.bottom){
                    this.y += ROW_HEIGHT;
                }
                break;
            case 'left':
                if(this.x >= MAX_LOCS.left){
                    this.x -= COL_WIDTH;
                }
                break;
            case 'right':
                if(this.x <= MAX_LOCS.right){
                    this.x += COL_WIDTH;
                }
                break;
            default:
                break;
        }
        this.render(Resources.get(this.sprite),this.x,this.y);
    };

    // Changes game difficulty depending on how the player is doing
    this.calculateDifficulty = function(){
        var changed = false;
        // Decrease difficulty
        if(this.loseCounter >= 5){
            this.loseCounter = 0;
            this.WinCounter = 0;
            if(maxSpeed > MIN_MAX_SPEED){
                maxSpeed --;
                changed = true;
            }
            if(minSpeed > MIN_MIN_SPEED){
                minSpeed --;
                changed = true;
            }
            if(changed){
                console.log('decreasing difficulty');
                console.log('min speed:' + minSpeed);
                console.log('max speed:' + maxSpeed);
            }else{
                console.log('can\'t lower difficulty any more!');
            }
        }
        // Increase difficulty
        if(this.winCounter >= 5){
            this.loseCounter = 0;
            this.winCounter = 0;
            if(maxSpeed < MAX_MAX_SPEED){
                maxSpeed ++;
                changed = true;
            }
            if(minSpeed < MAX_MIN_SPEED){
                minSpeed ++;
                changed = true;
            }
            if(changed){
                console.log('increasing difficulty');
                console.log('min speed:' + minSpeed);
                console.log('max speed:' + maxSpeed);
            }else{
                console.log('can\'t increase difficulty any more!');
            }
        }
    };

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(startingLoc.player.x,startingLoc.player.y);
var allEnemies = [
    new Enemy(1,startingLoc.enemy1.x,startingLoc.enemy1.y),
    new Enemy(2,startingLoc.enemy2.x,startingLoc.enemy2.y),
    new Enemy(3,startingLoc.enemy3.x,startingLoc.enemy3.y),
    new Enemy(4,startingLoc.enemy4.x,startingLoc.enemy4.y)
];

// So that I don't need to keep remembering or calculating coordinates, this will return the correct coordinates to draw a player/enemy based on grid coordinates
function getCoords(x,y) {
    return {'x': (x * COL_WIDTH), 'y': (y * ROW_HEIGHT) - BOTTOM_ROW_EXTRA + ROW_HEIGHT};
}

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