class Boot extends Phaser.State {

  preload() {
    this.load.image('icon', 'system/icon.jpg');
    this.load.image('loadbar', 'system/ProgressBar.png');

  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    this.game.plugins.add(Fabrique.Plugins.InputField);
    this.state.start('PreLogin');
  }
}

export default Boot;
