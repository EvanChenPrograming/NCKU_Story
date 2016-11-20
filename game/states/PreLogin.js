import * as GlobalVar from "../functions/GlobalVar"

class PreLogin extends Phaser.State {

  preload() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'icon');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.6, 0.6);
    this.preloadBar = this.add.sprite(this.game.world.centerX, 620, 'loadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    //load login assets
    this.load.audio('bgm', ['bgm/login.mp3', 'bgm/login.ogg']);
    this.load.image('bg', 'system/login.png');
    this.load.image('enter', 'system/enter.png')

  }

  create() {
    this.game.stage.disableVisibilityChange = true;
    GlobalVar.bgm=this.game.add.audio('bgm', 1, true)
    GlobalVar.bgm.play();
    this.add.plugin(Fabrique.Plugins.InputField);
    

    this.state.start('Login');
  }

}

export default PreLogin;
