import Boot from 'states/Boot';
import PreLogin from 'states/PreLogin';
import Login from 'states/Login';
import PreSelect from 'states/PreSelect';
import SelectChar from 'states/SelectChar';
import PreMain from 'states/PreMain';
import Main from 'states/Main';
import Reload from 'states/Reload';
import Abort from 'states/Abort';

class Game extends Phaser.Game{

  constructor(){
    super(1280, 720, Phaser.AUTO, 'NCKUSTORY');

    this.state.add('Boot', Boot);
    this.state.add('PreLogin', PreLogin);
    this.state.add('Login', Login);
    this.state.add('PreSelect', PreSelect);
    this.state.add('SelectChar', SelectChar);
    this.state.add('PreMain', PreMain);
    this.state.add('Main', Main);
    this.state.add('Reload', Reload);
    this.state.add('Abort', Abort);

    this.state.start('Boot');
  }

}


new Game();
