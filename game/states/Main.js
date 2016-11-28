import * as GlobalVar from "../functions/GlobalVar"
import Func from "../functions/func"

let map, base, collide, bg = [];
let player, shadow = [];
let npc = [];
let monster = [];

let onGround;

let keys, jump, cursors;

class Main extends Phaser.State {

  create() {
    // GlobalVar.bgm.stop();
    this.game.stage.backgroundColor = '#fff';

    //bg  todo
    bg[0]=this.game.add.sprite(0, 0, GlobalVar.MapInfo.bg[1][0]);
    bg[0].scale.setTo(1.2);
    bg[0].fixedToCamera = true;

    map = this.game.add.tilemap('tilemap');
    for (const pix of GlobalVar.MapInfo.Tiles){
      map.addTilesetImage(pix, pix);
    }
    for (const pix of GlobalVar.MapInfo.obj){
      map.addTilesetImage(pix, pix);
    }

    for (let i=1;i<=GlobalVar.MapInfo.BackGround;i++){
      map.createLayer('back'+i);
    }
    base = map.createLayer('base');
    base.resizeWorld();
    collide = map.createLayer('collide');
    for (let i=1;i<=GlobalVar.MapInfo.Layer;i++){
      map.createLayer('layer'+i);
    }
    map.setCollisionByExclusion([0], true, base);
    map.setCollision(GlobalVar.MapInfo.CollideTileIdx, true, collide);
    Func.setTileCollision(collide, GlobalVar.MapInfo.CollideTileIdx, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });


    //Func.setTileCollision()



    // test sprite
    player = this.game.add.sprite(100, 300,'test');
    this.game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    player.animations.add('jump', [0, 1, 2],10 ,false);
    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);
    this.game.camera.follow(player);

    //get point
    player.inputEnabled = true;
    player.events.onInputOver.add(this.getPoint, this);




    //keys
    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    cursors = this.game.input.keyboard.createCursorKeys();

  }

  update() {
    onGround = this.game.physics.arcade.collide(player, base) || this.game.physics.arcade.collide(player, collide);


    // test

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 1;
    }
    if (jump.isDown && onGround)
    {
        player.body.velocity.y = -300;
    }


  }

  getPoint(){
    console.log('X: '+player.x+' Y: '+player.y);
  }

  shutdown() {

  }

}

export default Main;
