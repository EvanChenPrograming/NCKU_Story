class Boot extends Phaser.State {

  preload() {
    this.load.image('icon', 'assets/system/icon.jpg');
    this.load.image('loadbar', 'assets/system/ProgressBar.png');
  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    this.state.start('PreLogin');
  }
}

export default Boot;
