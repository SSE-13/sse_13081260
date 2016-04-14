var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
humanContainer.addChild(human);
human.addChild(head);
human.addChild(trunk);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(left_arm);
human.addChild(right_arm);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["C.png", "D.png", "E.png", "F.png", "A.png", "B.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.rotation += Math.PI * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 2;
body.y = 200;
ticker.start([body]);
//# sourceMappingURL=game.js.map