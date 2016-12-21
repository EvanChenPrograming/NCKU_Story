import * as GlobalVar from "../functions/GlobalVar"
import Func from "../functions/func"
import Monster from "../objects/Monster"
import Player from "../objects/Player"
import Npc from "../objects/Npc"
import Textbox from "../feature/Textbox"

let map, base, collide, bg = [], monsBound,rope, ladder, trans;
let player, shadow = [];
let npc;
let monster;
let atk=false,jum=false;
// flags bool
let onTrans;
// flags num
let onTransID;

let keys, jump, cursors, attack;
let b=0;

class Main extends Phaser.State {

  create() {
    // GlobalVar.bgm.stop();
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
    monsBound = map.createLayer('monsBound');
    if(GlobalVar.MapInfo.Rope[0]){
      let ropelayer = map.createLayer('rope');
      rope = this.game.add.group();
      rope.enableBody=true;
      map.createFromTiles(GlobalVar.MapInfo.Rope[1], null, null, ropelayer, rope);
      rope.forEach((child)=>{child.x+=16;child.scale.setTo(0.2,1);}, this);
    }
    if(GlobalVar.MapInfo.Ladder[0]){
      let ladderlayer = map.createLayer('ladder');
      ladder = this.game.add.group();
      ladder.enableBody=true;
      map.createFromTiles(GlobalVar.MapInfo.Ladder[1], null, null, ladderlayer, ladder);
      ladder.forEach((child)=>{child.x+=16;child.scale.setTo(0.2,1);}, this);
    }

    map.setCollisionByExclusion([0], true, base);
    map.setCollisionByExclusion([0], true, monsBound);
    map.setCollision(GlobalVar.MapInfo.CollideTileIdx, true, collide);
    Func.setTileCollision(collide, GlobalVar.MapInfo.CollideTileIdx, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });
    this.game.physics.arcade.TILE_BIAS = 20; //origin is 12

    //Func.setTileCollision()
    //test monster
    npc = undefined;
    monster = this.add.group();
    if(GlobalVar.MapInfo.MapNum==1){
      npc = new Npc(this.game, 1772,10,this.camera,GlobalVar.NPCInfo);
    }
    if(GlobalVar.MapInfo.MapNum==2){
      for(let i=0;i<30;i++){
        let tmp = new Monster(this.game,this.rnd.between(210,1350),this.rnd.between(52,1012),this.camera,GlobalVar.MonsterInfo);
        monster.add(tmp);
      }
    }




    // test sprite
    if(GlobalVar.fromMap!=0){
      let x=0,y=0;
      for( let i in GlobalVar.MapInfo.TransPoint){
        if(i=='0')continue;
        if(GlobalVar.MapInfo.TransPoint[i][2] == GlobalVar.fromMap){
          x=GlobalVar.MapInfo.TransPoint[i][0];
          y=GlobalVar.MapInfo.TransPoint[i][1]-93;
        }
      }
      player = new Player(this.game,x, y, this.camera, GlobalVar.Char);
    }
    else player = new Player(this.game,GlobalVar.MapInfo.TransPoint[0][0], GlobalVar.MapInfo.TransPoint[0][1], this.camera, GlobalVar.Char);

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

    this.game.input.onTap.add(this.onTap, this);




    //keys
    jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    attack = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    cursors = this.game.input.keyboard.createCursorKeys();

  }

  update() {

    this.game.physics.arcade.collide(npc, base);
    this.game.physics.arcade.collide(npc, collide);
    this.game.physics.arcade.collide(npc, monsBound);

    this.game.physics.arcade.collide(monster, base);
    this.game.physics.arcade.collide(monster, collide);
    this.game.physics.arcade.collide(monster, monsBound);
    this.game.physics.arcade.overlap(monster, player);
    this.game.physics.arcade.overlap(monster,player.hitboxes,(b, hitbox)=>{b.kill();});

    this.game.physics.arcade.collide(player, base);
    if(!player.onClimb)this.game.physics.arcade.collide(player, collide);
    onTrans = this.game.physics.arcade.overlap(player,trans, (player, tran)=>{onTransID=tran.name;});
    player.overRope=this.game.physics.arcade.overlap(player, rope);
    player.overLadder=this.game.physics.arcade.overlap(player, ladder);
    // test

    if (cursors.left.isDown)
    {
      player.LeftPressed=true;
    }
    else if (cursors.right.isDown)
    {
      player.RightPressed=true;
    }
    if(cursors.up.isDown){
      player.UpPressed=true;
    }
    else if(cursors.down.isDown){
      player.DownPressed=true;
    }
    if (attack.isDown || atk){
      player.AttackPressed=true;
    }
    if (jump.isDown || jum)
    {
      player.JumpPressed=true;
    }

    if (cursors.up.isDown && player.body.onFloor() && onTrans){
      GlobalVar.fromMap=GlobalVar.Char.CurrentMap[0];
      GlobalVar.Char.CurrentMap[0]=GlobalVar.MapInfo.TransPoint[onTransID][2];
      $.getJSON('map/mapconfig/map'+GlobalVar.Char.CurrentMap[0]+'conf.json', (data)=>{
        GlobalVar.MapInfo=data;
        this.game.state.start('Reload');
      });
    }

    player.Action();
    if(npc!==undefined)npc.Action();
    monster.forEachAlive((child)=>{child.Action();},this);
    if(GlobalVar.MapInfo.MapNum==2 && b==0){
      if(monster.getFirstAlive()==null){
        ++b;
        let tmp = new Textbox(this.game,this.camera,'不可能!!!'+'\n'+'我居然輸了.....');
      }
    }
    atk=jum=false;

  }

  // render(){
  //   this.game.debug.text('monsters: '+ monster.countLiving(),32,32);
  // }

  getPoint(){
    console.log('X: '+player.x+' Y: '+player.y);
  }
  onTap(pointer, doubleTap) {
    if (doubleTap)
    {
        atk=true;
    }
    else
    {
        jum=true;
    }

}
  shutdown() {

  }

}

export default Main;
