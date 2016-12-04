import * as GlobalVar from "../functions/GlobalVar"

let Text;
let Font = {};

class Textbox extends Phaser.Sprite{

  constructor(game, camera, text, font=Font){
    super(game, camera.width/2, camera.height/2, 'textboxbg');
    // this.width=1000;this.height=500;
    game.add.existing(this);
    this.scale.setTo(2,2);
    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera =true;
    this.inputEnabled = true;
    this.input.enableDrag();

    text = game.add.text(0, 0, '我是'+'\n'+'大魔王！！', { font: "15px Arial", fill: "#19de65"});
    this.addChild(text);


    let button = game.add.button(-this.width/4+30, this.height/4-10,'textboxbutton',()=>{this.destroy();});
    button.anchor.setTo(0.5, 0.5);
    button.scale.setTo(0.1,0.1);
    this.addChild(button);

  }


}


export default Textbox;
