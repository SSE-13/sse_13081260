module game {

}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var human = new render.DisplayObjectContainer();


head.source = "C.png";
trunk.source = "D.png";
left_leg.source = "E.png";
right_leg.source = "F.png";
left_arm.source = "A.png";
right_arm.source = "B.png";

humanContainer.addChild(human)
human.addChild(head)
human.addChild(trunk)
human.addChild(left_leg)
human.addChild(right_leg)
human.addChild(left_arm)
human.addChild(right_arm)


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["C.png","D.png","E.png","F.png","A.png","B.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         
         this.rotation += Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);

body.vx = 2;
body.y = 200;

ticker.start([body]);