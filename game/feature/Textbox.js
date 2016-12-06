import * as GlobalVar from "../functions/GlobalVar"

let Text;
let Font = {};

class Textbox extends Phaser.Sprite{

  constructor(game, camera, text, font=Font){
    super(game, camera.width/2, camera.height/2, 'textboxbg');
    // this.width=1000;this.height=500;
    game.add.existing(this);
    this.width=this.width*2;
    this.height=this.height*2;
    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera =true;
    this.inputEnabled = true;
    this.input.enableDrag();

    Text = game.add.text(0, -this.height/4+20, text, { font: "15px Arial", fill: "#19de65"});
    this.addChild(Text);
    // Text.setText(test);

    let button = game.add.button(-this.width/4, this.height/4,'textboxbutton',()=>{this.destroy();});
    button.anchor.setTo(0,1);
    button.scale.setTo(0.1,0.1);
    this.addChild(button);

    //test
    let sprite = game.add.image(-this.width/8,0,'dirty',5);
    sprite.anchor.setTo(0,0.5);
    this.addChild(sprite);

  }


}


export default Textbox;
