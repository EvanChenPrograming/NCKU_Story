import * as GlobalVar from '../functions/GlobalVar';


class PreMain extends Phaser.State {

  preload() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tree');
    this.splash.anchor.setTo(0.5);
    //this.splash.scale.setTo(0.6, 0.6);
    this.preloadBar = this.add.sprite(this.game.world.centerX, 620, 'loadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.game.stage.backgroundColor = '#0e2c5b';

    this.load.image('startbt', 'system/start.png');

    // load main asssets
      //map
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


    //load char assets
      // test
    this.load.spritesheet('test', 'character/test/org_h01.png', 32, 32);
    // load monster assets

    // load NPC assets




  }
  create(){
    this.add.button(this.game.world.centerX, this.game.world.centerY, 'startbt', this.onClick, this)
  }

  onClick(){
    GlobalVar.bgm.stop();
    GlobalVar.bgm=this.game.add.audio('Mainbgm', GlobalVar.MapInfo.bgm[1], true)
    GlobalVar.bgm.play();
    this.state.start('Main');
  }

}

export default PreMain;
