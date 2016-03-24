module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;
    

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
            

        }

        render(context: CanvasRenderingContext2D) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                   
                    if(!this.grid.getNode(i,j).walkable){
                        context.fillRect(i * GRID_PIXEL_WIDTH, (j-1) * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillStyle = '#000000';
                    }
                    else {
                        context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillStyle = '#0000FF';
                    }
                    context.fill();
                    context.stroke();
                 } 
            }
            context.closePath();

        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {

        public FindPath : astar.AStar; 
        public Da = new Array();
        public Db = new Array();
        public da = new Array();
        public db = new Array();
        public movestep = 1;
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            for(var i=0; i <this.FindPath._path.length; i++)
            {
                this.Da[i] = this.FindPath._path[i].x;
                this.Db[i] = this.FindPath._path[i].y;
                console.log("("+this.Da[i]+","+this.Db[i]+")");
            }
            for(var j=1; j <this.FindPath._path.length; j++){
                this.da[j] = this.Da[j] - this.Da[j-1];
                this.db[j] = this.Db[j] - this.Db[j-1];
                console.log(this.da[j]+"  "+this.db[j]);
            }
            console.log(path);
            console.log(grid.toString());

        }

        public onTicker(duringTime) {
            if(this.x < NUM_ROWS * GRID_PIXEL_WIDTH && this.y < NUM_COLS * GRID_PIXEL_HEIGHT){
                if(this.movestep < this.FindPath._path.length-1){
                   this.x += this.da[this.movestep]*GRID_PIXEL_WIDTH;
                   this.y += this.db[this.movestep]*GRID_PIXEL_HEIGHT;
                   this.movestep++;
                   console.log("movestep:"+this.movestep);
                   console.log(this.da[this.movestep]+"  "+this.db[this.movestep]);
                }       
            }       
        }
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);



var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);