// Constants
var colWidth = 101;
var rowHeight = 83;
var bottomRowExtra = 94;
var maxLocs = {'bottom': 327, 'top': 78, 'left': 1, 'right': 303, 'middle': 150};   // max locs there so we can stop the player jumping off the screen, and middle so we have a decent minimum point at where to add more enemies
var startingLoc = {
    'player':getCoords(2,5),
    'enemy1':getCoords(0,1),
    'enemy2':getCoords(0,2),
    'enemy3':getCoords(0,3),
    'enemy4':getCoords(0,1),
    'enemy5':getCoords(0,2),
    'enemy6':getCoords(0,3)
};
var maxSpeed=10;
var minSpeed=5;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    getCoords(2,7);
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    if(this.y);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 1 * dt * this.speed * 50;   // +1 needed so that we don't multiply starting position of 0 so they actually start moving
    this.render;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.update = function(){
    };
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
    }
    this.handleInput = function(key){
        switch(key){
            case 'up':
                if(this.y >= maxLocs.top){
                    this.y -= rowHeight;
                }
                break;
            case 'down':
                if(this.y <= maxLocs.bottom){
                    this.y += rowHeight;
                }
                break;
            case 'left':
                if(this.x >= maxLocs.left){
                    this.x -= colWidth;
                }
                break;
            case 'right':
                if(this.x <= maxLocs.right){
                    this.x += colWidth;
                }
                break;
            default:
                break;
        }
        this.render(Resources.get(this.sprite),this.x,this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(startingLoc.player.x,startingLoc.player.y);
var allEnemies = [
    new Enemy(startingLoc.enemy1.x,startingLoc.enemy1.y),
    new Enemy(startingLoc.enemy1.x,startingLoc.enemy2.y),
    new Enemy(startingLoc.enemy1.x,startingLoc.enemy3.y),
];

// So that I don't need to keep remembering or calculating coordinates, this will return the correct coordinates to draw a player/enemy based on grid coordinates
function getCoords(x,y) {
    //y--;
    return {'x': (x * colWidth), 'y': (y * rowHeight) - bottomRowExtra + rowHeight};
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