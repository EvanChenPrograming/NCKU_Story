import * as GlobalVar from "../functions/GlobalVar"



class Monster extends Phaser.Sprite{

  constructor(game, x, y, camera, mons){
    super(game, x, y);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    this.body.bounce.x=1;
    this.body.bounce.y=0.5;

    this.body.setSize(mons.bodySizeX, mons.bodySizeY);
    this.anchor.setTo(0.5, 0.5);
    this.sprite = game.add.sprite(0, 0, 'test');
    this.sprite.anchor.setTo(0.5, 0.5);
    // for(const it in mons.animations){
    //   this.sprite.animations.add(it, mons.animate[it][frame], npc.animations[it][fps], true);
    // }
    console.log('monster!!');
    this.addChild(this.sprite);
  }
  // move(){
  // //   let rand = Math.floor((Math.random() * 100) + 1);
  // //   for(let it in npc.pattern){
  // //     if(rand<in){
  // //       // this.sprite
  // //     }
  // //   }
  // }



}

export default Monster;
