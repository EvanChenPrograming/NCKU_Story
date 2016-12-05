import * as GlobalVar from "../functions/GlobalVar"



class Player extends Phaser.Sprite{

  constructor(game, x, y, camera, char){
    super(game, x, y);

    this.faceLeft=false;
    this.onClimb=false;
    this.onAttack=false;
    this.isSuper=false;
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
        tmp.animations.add(j.toString(), sheets[i].animates[j].frame, sheets[i].animates[j].fps, sheets[i].animates[j].loop);
      }
      this.anime.add(tmp);
    }

    this.addChild(this.anime);

  }

 








  resist(){
      this.body.velocity.x=0;
  }
  stop(){
    if(this.body.onFloor())
    this.anime.callAll('play', null, 'stand');
  }
  goRight(){
    if(this.faceLeft==true){
      this.scale.x*=-1;
      this.faceLeft=false;
    }
    this.body.velocity.x = 150;
    if(this.body.onFloor())
    this.anime.callAll('play', null, 'walk');
  }
  goLeft(){
    if(this.faceLeft==false){
      this.scale.x*=-1;
      this.faceLeft=true;
    }
    this.body.velocity.x = -150;
    if(this.body.onFloor())
    this.anime.callAll('play', null, 'walk');
  }
  jump(){
    if(!this.body.onFloor())return;
    this.body.velocity.y = -300;
    this.anime.callAll('play', null, 'jump');
  }



}

export default Player;
