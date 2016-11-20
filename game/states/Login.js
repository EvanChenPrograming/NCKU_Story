import * as GlobalVar from "../functions/GlobalVar"


class Login extends Phaser.State {

  create() {

    this.game.add.tileSprite(0, 0, 1280, 720, 'bg');
    this.confirm = this.game.add.button(this.game.world.centerX+100, 400, 'enter', this.onClick);
    this.user_name = this.game.add.inputField(540, 233, {
      font: '25px Arial',
      fill: '#212121',
      fontWeight: 'bold',
      width: 230,
      max: 20,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      placeHolder: 'Username',
      textAlign: 'center'
    });
    this.user_name.setText(GlobalVar.usr_name);
    this.user_name.blockInput = false;

    this.user_passwd = this.game.add.inputField(540, 315, {
      font: '25px Arial',
      fill: '#212121',
      fontWeight: 'bold',
      width: 230,
      max: 20,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      placeHolder: 'Password',
      textAlign: 'center',
      type: Fabrique.InputType.password,
    });
    this.user_passwd.setText(GlobalVar.usr_passwd);

    //this.KeyEnter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  }

  onClick() {

    //communication with server
    if(this.user_name == GlobalVar.usr_name && this.user_passwd == GlobalVar.usr_passwd){

    }

    GlobalVar.bgm.stop();
    //this.state.start('PreMain');
  }

}

export default Login;
