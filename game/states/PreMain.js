import * as GlobalVar from '../functions/GlobalVar';


class PreMain extends Phaser.State {

  preload() {

    this.game.stage.backgroundColor = '#9d06a3';

  }

  create() {
    console.log(GlobalVar.MapInfo.MapNum);
  }

}

export default PreMain;
