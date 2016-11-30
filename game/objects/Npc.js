import * as GlobalVar from "../functions/GlobalVar"
import Textbox from "../feature/Textbox"


let text;

class Npc extends Phaser.Sprite{

  constructor(game, camera, npc){
    super(game, npc.x, npc.y);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.body.setSize(npc.bodySizeX, npc.bodySizeY);
    this.anchor.setTo(0.5, 0.5);
    this.sprite = game.add.sprite(npc.x, npc.y, npc.name);
    this.sprite.anchor.setTo(0.5, 0.5);
    for(const it in npc.animations){
      this.sprite.animations.add(it, npc.animate[it][frame], npc.animations[it][fps], true);
    }
    this.addChild(this.sprite);
  }
  move(){
    let rand = Math.floor((Math.random() * 100) + 1);
    for(let it in npc.pattern){
      if(rand<in){
        // this.sprite
      }
    }
  }



}

export default Npc
