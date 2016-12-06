import * as GlobalVar from "../functions/GlobalVar"

let ctr=0;

class Player extends Phaser.Sprite{

  constructor(game, x, y, camera, char){
    super(game, x, y);

    this.faceLeft=false;
    this.onClimb=false;
    this.onAttack=false;
    this.isSuper=false;
    this.overRope=false;
    this.overLadder=false;
    this.block=false;
    this.hitboxes = game.add.group();

    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;

    this.game=game;
    this.camera=camera;
    this.char=char;

    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;
    this.body.bounce.y=0.1;

    this.body.setSize(35, 60);
    this.anime = game.add.group();
    let sheets = char.Sheets;
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

    this.hitboxes.enableBody = true;
    let hitbox1 = this.hitboxes.create(25,20,null);
    // hitbox1.width=40;
    // hitbox1.height=60;
    hitbox1.anchor.setTo(0.5, 0.5);
    hitbox1.body.setSize(35,60);
    hitbox1.name='hitbox1';
    hitbox1.kill();

    this.addChild(this.hitboxes);
    this.addChild(this.anime);

  }

  Action(){
    if(this.onAttack)return;
    this.body.velocity.x=0;
    if(!this.overLadder && !this.overRope)this.onClimb=false;
    if(this.onClimb){
      this.body.gravity.y=0;
      this.body.velocity.y=0;
    }
    else this.body.gravity.y=500;

    if(!this.onClimb && this.AttackPressed && !this.block){
      this.block=true;
      this.Attack();
      this.resetFlag();
      setTimeout(()=>{this.block=false;},650);
      return;
    }

    if(this.RightPressed && !this.onClimb){
      this.goRight(this.body.onFloor());
    }
    else if(this.LeftPressed && !this.onClimb){
      this.goLeft(this.body.onFloor());
    }
    else if(this.UpPressed){
      if(this.overLadder || this.overRope){
        this.climbUp();
      }
    }
    else if(this.DownPressed){
      if(this.overLadder || this.overRope){
        this.climbDown();
      }
    }
    else if(!this.onClimb){
      this.stand();
    }
    if(this.JumpPressed && (this.body.onFloor() || this.onClimb)){
      this.jump();
    }
    this.resetFlag();
    return;
  }

  resetFlag(){
    this.LeftPressed=false;
    this.RightPressed=false;
    this.AttackPressed=false;
    this.JumpPressed=false;
    this.UpPressed=false;
    this.DownPressed=false;
    this.overLadder=false;
    this.overRope=false;
  }

  stand(){
    this.anime.callAll('play', null, 'stand');
  }
  goRight(playAnimate){
    if(this.faceLeft==true){
      this.scale.x*=-1;
      this.faceLeft=false;
    }
    this.body.velocity.x = this.char.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  goLeft(playAnimate){
    if(this.faceLeft==false){
      this.scale.x*=-1;
      this.faceLeft=true;
    }
    this.body.velocity.x = -this.char.Speed;
    if(playAnimate)this.anime.callAll('play', null, 'walk');
  }
  jump(){
    this.body.velocity.y = -this.char.Jump;
    this.anime.callAll('play', null, 'jump');
    this.onClimb=false;
  }
  climbUp(){
    this.body.velocity.y = -this.char.Speed;
    this.anime.callAll('play', null, 'climb');
    this.onClimb=true;
  }
  climbDown(){
    this.body.velocity.y = this.char.Speed;
    this.anime.callAll('play', null, 'climb');
    this.onClimb=true;
  }
  Attack(){
    this.onAttack=true;
    this.anime.callAll('play', null, 'attack');
    this.hitboxes.getByName('hitbox1').revive();
    // setTimeout(()=>{this.hitboxes.getByName('hitbox1').revive();}, 100);

    this.anime.forEach((child)=>{

      child.animations.currentAnim.onComplete.addOnce(()=>{
        this.onAttack=false;
        this.stand();
        this.hitboxes.getByName('hitbox1').kill();
        },
        this);

      },this);


  }



}

export default Player;
