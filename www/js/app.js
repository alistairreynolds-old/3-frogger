// Constants
var colWidth = 101;
var rowHeight = 83;
var bottomRowHeight = 171;
var maxLocs = {'bottom': 327, 'top': 78, 'left': 1, 'right': 303};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    console.log(x,y);
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

var startingLoc = getCoords(2,7);
var player = new Player(startingLoc.x,startingLoc.y);
var allEnemies = [new Enemy(), new Enemy()];

// So that I don't need to keep remembering or calculating coordinates, this will return the correct coordinates to draw a player/enemy based on grid coordinates
function getCoords(x,y) {
    //y--;
    return {'x': (x * colWidth), 'y': (y * rowHeight) - bottomRowHeight};     
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