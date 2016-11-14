//Set global values
  //Declare game object
var NSgame = NSgame || {};


//set normal values


/*Arcade set n-way tile collision
ex. setTileCollision(Layer,[1,5]{
  top: true,
  bottom: false,
  left: false,
  right: false
})
*/
function setTileCollision(mapLayer, idxOrArray, dirs) {

    var mFunc; // tile index matching function
    if (idxOrArray.length) {
        // if idxOrArray is an array, use a function with a loop
        mFunc = function(inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {
        // if idxOrArray is a single number, use a simple function
        mFunc = function(inp) {
            return inp === idxOrArray;
        };
    }

    // get the 2-dimensional tiles array for this layer
    var d = mapLayer.map.layers[mapLayer.index].data;

    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].length; j++) {
            var t = d[i][j];
            if (mFunc(t.index)) {

                t.collideUp = dirs.top;
                t.collideDown = dirs.bottom;
                t.collideLeft = dirs.left;
                t.collideRight = dirs.right;

                t.faceTop = dirs.top;
                t.faceBottom = dirs.bottom;
                t.faceLeft = dirs.left;
                t.faceRight = dirs.right;

            }
        }
    }
}

//Define states
NSgame.Boot = function(){};
NSgame.preLogin = function(){};
NSgame.Login = function(){};
NSgame.preSelect = function(){};
NSgame.Select = function(){};
NSgame.preGame = function(){};
NSgame.Game = function(){};
NSgame.reload = function(){};
NSgame.abort = function(){};

/*  player class

*/
//todo

/*  monster class

*/
//todo

/*  map class

*/
//todo

/*  npc class

*/
//todo

/*   class

*/
//todo



NSgame.Boot.prototype = {};
NSgame.preLogin.prototype = {};
NSgame.Login.prototype = {};
NSgame.preSelect.prototype = {};
NSgame.Select.prototype = {};
NSgame.preGame.prototype = {};
NSgame.Game.prototype = {};
NSgame.reload.prototype = {};
NSgame.abort.prototype = {};








NSgame.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'NSgame');

NSgame.game.state.add('Boot', NSgame.Boot);
NSgame.game.state.add('preLogin', NSgame.preLogin);
NSgame.game.state.add('Login', NSgame.Login);
NSgame.game.state.add('preSelect', NSgame.preSelect);
NSgame.game.state.add('Select', NSgame.Select);
NSgame.game.state.add('preGame', NSgame.preGame);
NSgame.game.state.add('Game', NSgame.Game);
NSgame.game.state.add('reload', NSgame.reload);
NSgame.game.state.add('abort', NSgame.abort);
