var ground, canvas, stage, player, width, heigth;

function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	stage = new Stage(canvas);


	width = canvas.width;
	height = canvas.height;

	// frames per second
	Ticker.setFPS(16);
	Ticker.addListener(window);


	player = new Player();
	player.x = width / 2;
	player.y = height / 2;
	player.create();
	stage.addChild(player.obj);
	window.addEventListener("keydown", player.edge, true);

	ground = new ParallaxScrolling(ctx, layer);
//	ground = new Ground();
}

function tick() {
	stage.update();
	ground.Draw();
	}
