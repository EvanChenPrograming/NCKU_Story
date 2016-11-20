import Boot from './states/Boot';
import PreLogin from './states/PreLogin';
import Login from './states/Login';
import PreSelect from './states/PreSelect';
import SelectChar from './states/SelectChar';
import PreCreateChar from './states/PreCreateChar';
import CreateChar from './states/CreateChar'
import PreMain from './states/PreMain';
import Main from './states/Main';
import Reload from './states/Reload';

class Game extends Phaser.Game{

  constructor(){
    super(1280, 720, Phaser.AUTO, 'NCKUSTORY');

    this.state.add('Boot', Boot);
    this.state.add('PreLogin', PreLogin);
    this.state.add('Login', Login);
    this.state.add('PreSelect', PreSelect);
    this.state.add('SelectChar', SelectChar);
    this.state.add('PreCreateChar', PreCreateChar);
    this.state.add('CreateChar', CreateChar);
    this.state.add('PreMain', PreMain);
    this.state.add('Main', Main);
    this.state.add('Reload', Reload);

    this.state.start('Boot');
  }

}


new Game();
