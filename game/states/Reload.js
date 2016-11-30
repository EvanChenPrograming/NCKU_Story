import * as GlobalVar from '../functions/GlobalVar';

let player;


class Reload extends Phaser.State {

  preload() {
    this.game.stage.backgroundColor = '#000000';
    player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'test');
    player.animations.add('right', [6, 7, 8], 10, true);
    player.scale.setTo(2);
    this.game.camera.follow(player);
    player.animations.play('right');

    this.load.tilemap('tilemap', 'map/json/'+GlobalVar.MapInfo.json, null, Phaser.Tilemap.TILED_JSON);

    for (const pix of GlobalVar.MapInfo.Tiles){
      this.load.image(pix, 'map/tiles/'+pix+'.png');
    }
    for (const pix of GlobalVar.MapInfo.obj){
      this.load.image(pix, 'map/obj/'+pix+'.png');
    }
    for (let i=1;i<GlobalVar.MapInfo.bg[0];i++){
      this.load.image(GlobalVar.MapInfo.bg[i][0], 'map/bg/'+GlobalVar.MapInfo.bg[i][0]+'.png');
    }

    this.load.audio('Mainbgm', 'bgm/'+GlobalVar.MapInfo.bgm[0]+'.mp3');
  }

  create(){
    GlobalVar.bgm.stop();
    GlobalVar.bgm=this.game.add.audio('Mainbgm', GlobalVar.MapInfo.bgm[1], true)
    GlobalVar.bgm.play();
    this.state.start('Main');
  }

}

export default Reload;
