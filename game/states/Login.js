import * as GlobalVar from "../functions/GlobalVar"

let user_name, user_passwd;

class Login extends Phaser.State {

  create() {
    this.game.add.tileSprite(0, 0, 1280, 720, 'bg');
    this.confirm = this.game.add.button(this.game.world.centerX+100, 400, 'enter', this.onClick);
    Fabrique.Plugins.InputField.onKeyboardClose.add(function() {
                    this.resizeBackgroundImage();
                });
    user_name = this.game.add.inputField(540, 233, {
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
    user_name.setText(GlobalVar.usr_name);
    user_name.blockInput = false;

    user_passwd = this.game.add.inputField(540, 315, {
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
    // user_passwd.setText(GlobalVar.usr_passwd);
    //this.KeyEnter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  }

  onClick() {

    //not communicating with server
    if(user_name.value == GlobalVar.usr_name /*&& user_passwd.value == 'nckustory'*/){
      GlobalVar.bgm.stop();
      user_name.destroy();
      user_passwd.destroy();
      GlobalVar.usrUID = 34041092;
      //request for char & map with userUID
      $.getJSON('testJSON/char.json',(data)=>{GlobalVar.Char=data;$.getJSON('map/mapconfig/map'+GlobalVar.Char.CurrentMap[0]+'conf.json', (data)=>{GlobalVar.MapInfo=data;this.game.state.start('PreMain')})});



      GlobalVar.bgm=this.game.add.audio('PreMainbgm', 1, true)
      GlobalVar.bgm.play();
      //this.state.start('PreSelect');

    }
    else {
      alert('Wrong password or wrong username!!');
      user_passwd.setText();
    }

  }

}

export default Login;
