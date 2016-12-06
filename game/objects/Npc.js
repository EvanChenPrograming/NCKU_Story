import * as GlobalVar from "../functions/GlobalVar"
import Textbox from "../feature/Textbox"


let text;

class Npc extends Phaser.Sprite{

  constructor(game, x, y, camera, npc){
    super(game, x, y);

    this.faceLeft=false;
    this.onAttack=false;
    this.isSuper=false;
    this.block=false;

    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;

    this.game=game;
    this.camera=camera;
    this.npc=npc;

    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    this.body.setSize(npc.bodySizeX, npc.bodySizeY);

    this.anime = game.add.group();
    let sheets = npc.Sheets;
    for(let i in sheets){
      let tmp = game.add.sprite(sheets[i].offX, sheets[i].offY, i.toString());
      for(let j in sheets[i].animates){
        let ref = tmp.animations.add(j.toString(), sheets[i].animates[j].frame, sheets[i].animates[j].fps, sheets[i].animates[j].loop);
        // if(sheets[i].animates[j].block){
        //   ref.onComplete.add(()=>{this.onAttack=false;this.stand();},this);
        // }
      }
      this.anime.add(tmp);

    }
    this.inputEnabled = true;
    this.events.onInputDown.add(()=>{
      let tmp = new Textbox(game,camera,'我是\n張天豪大魔王！！\n來打桌球吧ㄎㄎ\n我在下一張圖等你。');
      camera.shake();
      this.block=true;
      this.stand();
      this.body.velocity.x=0;
      this.LeftPressed=false;
      this.RightPressed=false;
      tmp.events.onDestroy.addOnce(()=>{this.block=false});

    }, this);
    this.addChild(this.anime);
    this.resetFlag();

  }
  pattern(){
    let rand = this.game.rnd.frac()*100;
    if(rand>67)this.RightPressed=true;
    else if(rand>33)this.LeftPressed=true;
    else return;
  }

  Action(){
    if(this.block)return;
    if(this.onAttack)return;
    this.body.velocity.x=0;
    this.onClimb?this.body.gravity.y=0:this.body.gravity.y=500;

    if(this.AttackPressed && !this.block){
      this.block=true;
      this.Attack();
      setTimeout(()=>{this.block=false;},650);
      return;
    }

    if(this.RightPressed){
      this.goRight(this.body.onFloor());
    }
    else if(this.LeftPressed){
      this.goLeft(this.body.onFloor());
    }
    else {
      this.stand();
    }
    if(this.JumpPressed && this.body.onFloor()){
      this.jump();
    }
    return;
  }
  resetFlag(){
    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;

    let rand = this.game.rnd.frac()*100;
    if(rand>70)this.RightPressed=true;
    else if(rand>40)this.LeftPressed=true;
    if(this.alive)setTimeout(()=>{this.resetFlag();},500);
  }
  stand(){
    this.anime.callAll('play', null, 'stand');
  }
  goRight(playAnimate){
    if(this.faceLeft==true){
      this.scale.x*=-1;
      this.faceLeft=false;
    }
    this.body.velocity.x = this.npc.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  goLeft(playAnimate){
    if(this.faceLeft==false){
      this.scale.x*=-1;
      this.faceLeft=true;
    }
    this.body.velocity.x = -this.npc.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  jump(){
    this.body.velocity.y = -this.npc.Jump;
    this.anime.callAll('play', null, 'jump');
    this.onClimb=false;
  }

  // move(){
  //   let rand = Math.floor((Math.random() * 100) + 1);
  //   for(let it in npc.pattern){
  //     if(rand<in){
  //       // this.sprite
  //     }
  //   }
  // }



}

export default Npc
