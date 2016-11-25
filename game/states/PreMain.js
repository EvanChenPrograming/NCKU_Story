import * as GlobalVar from '../functions/GlobalVar';

class PreMain extends Phaser.State {

  init() {
    //request for char & map with userUID
    //file = JSON.parse(fs.readFileSync('char.json'),{encoding:'utf8'})
    //AJAX
    let JSONobj;
    // let data;
    $.getJSON('map/mapconfig/map1conf.json', function(data){
      console.log(data);
    })
    //JSON.parse(text[, reviver])
    //console.log(JSONobj);
  }

  preload() {
    this.game.stage.backgroundColor = '#9d06a3';

  }

  create() {

  }

}

export default PreMain;
