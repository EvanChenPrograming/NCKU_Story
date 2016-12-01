import * as GlobalVar from "../functions/GlobalVar"
import Func from "../functions/func"

import Textbox from "../feature/Textbox"

let map, base, collide, bg = [], rope, ladder, trans;
let player, shadow = [];
let npc = [];
let monster = [];
// flags bool
let onGround, faceLeft, onClimb, onTrans;
// flags num
let onTransID;

let keys, jump, cursors;

class Main extends Phaser.State {

  create() {
    GlobalVar.bgm.stop();
    this.game.stage.backgroundColor = '#fff';

    //bg  todo
    bg[0]=this.game.add.sprite(0, 0, GlobalVar.MapInfo.bg[1][0]);
    bg[0].scale.setTo(GlobalVar.MapInfo.bg[1][3]);
    bg[0].fixedToCamera = true;

    map = this.game.add.tilemap('tilemap');
    for (const pix of GlobalVar.MapInfo.Tiles){
      map.addTilesetImage(pix, pix);
    }
    for (const pix of GlobalVar.MapInfo.obj){
      map.addTilesetImage(pix, pix);
    }

    base = map.createLayer('base');
    base.resizeWorld();
    collide = map.createLayer('collide');
    map.createLayer('layer1');
    map.createLayer('layer2');
    if(GlobalVar.MapInfo.Rope[0]){
      let ropelayer = map.createLayer('rope');
      rope = this.game.add.group();
      map.createFromTiles(GlobalVar.MapInfo.Rope[1], null, null, ropelayer, rope);
      rope.forEach((child)=>{child.x+=16;child.scale.setTo(0.2,1);}, this);
    }
    if(GlobalVar.MapInfo.Ladder[0]){
      let ladderlayer = map.createLayer('ladder');
      ladder = this.game.add.group();
      map.createFromTiles(GlobalVar.MapInfo.Ladder[1], null, null, ladderlayer, ladder);
      ladder.forEach((child)=>{child.x+=16;child.scale.setTo(0.2,1);}, this);
    }

    map.setCollisionByExclusion([0], true, base);
    map.setCollision(GlobalVar.MapInfo.CollideTileIdx, true, collide);
    Func.setTileCollision(collide, GlobalVar.MapInfo.CollideTileIdx, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });
    this.game.physics.arcade.TILE_BIAS = 20; //origin is 12

    //Func.setTileCollision()



    // test sprite
    if(GlobalVar.fromMap!=0){
      let x=0,y=0;
      for( let i in GlobalVar.MapInfo.TransPoint){
        if(i=='0')continue;
        if(GlobalVar.MapInfo.TransPoint[i][2] == GlobalVar.fromMap){
          x=GlobalVar.MapInfo.TransPoint[i][0]-20;
          y=GlobalVar.MapInfo.TransPoint[i][1]-42;
        }
      }
      player = this.game.add.sprite(x, y, 'test');
    }
    else player = this.game.add.sprite(GlobalVar.MapInfo.TransPoint[0][0],GlobalVar.MapInfo.TransPoint[0][1],'test');
    this.game.physics.arcade.enable(player);
    player.anchor.setTo(0.5,0.5);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    player.animations.add('jump', [0, 1, 2],10 ,false);
    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);
    this.game.camera.follow(player);


    map.createLayer('layer3');

    trans = this.add.group();
    for(let i in GlobalVar.MapInfo.TransPoint){
      if(i=='0')continue;
      let transBody = this.game.add.sprite(GlobalVar.MapInfo.TransPoint[i][0],GlobalVar.MapInfo.TransPoint[i][1],'');
      let transTMP = this.game.add.sprite(GlobalVar.MapInfo.TransPoint[i][0],GlobalVar.MapInfo.TransPoint[i][1],'trans');
      transBody.name=i;
      this.game.physics.arcade.enable(transBody);
      transBody.body.setSize(47,47);
      transBody.anchor.setTo(0.5,1);
      transTMP.scale.setTo(0.8);
      transTMP.anchor.setTo(0.5,1);
      transTMP.animations.add('shine',[0,1,2,3,2,1], 8, true);
      transTMP.animations.play('shine');
      trans.add(transTMP);
      trans.add(transBody);
    }

    //get point
    player.inputEnabled = true;
    player.events.onInputOver.add(this.getPoint, this);
    let a = this.add.sprite(800,800,'test',1);
    a.inputEnabled = true;
    a.events.onInputDown.add(()=>{let tmm=new Textbox(this.game,this.game.camera);console.log('clicked')} ,this);




    //keys
    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    cursors = this.game.input.keyboard.createCursorKeys();

  }

  update() {
    this.game.physics.arcade.collide(player, base);
    this.game.physics.arcade.collide(player, collide);
    onTrans = this.game.physics.arcade.overlap(player,trans, (player, tran)=>{onTransID=tran.name;});

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
    if (jump.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -300;
    }
    if (cursors.up.isDown && player.body.onFloor() && onTrans){
      GlobalVar.fromMap=GlobalVar.Char.CurrentMap[0];
      GlobalVar.Char.CurrentMap[0]=GlobalVar.MapInfo.TransPoint[onTransID][2];
      $.getJSON('map/mapconfig/map'+GlobalVar.Char.CurrentMap[0]+'conf.json', (data)=>{
        GlobalVar.MapInfo=data;
        this.game.state.start('Reload');
      });
    }


  }

  getPoint(){
    console.log('X: '+player.x+' Y: '+player.y);
  }

  shutdown() {

  }

}

export default Main;
