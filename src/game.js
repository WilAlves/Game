var canvas;
var stage;
var player;

function init() {

	canvas = document.getElementById("canvas");
	stage = new Stage(canvas);
	stage.snapPixelsEnabled = true;

	// frames per second
	Ticker.setFPS(16);
	Ticker.addListener(window);

	player = new Player();
	player.x = 200;
	player.y = 100;
	player.create();
	stage.addChild(player.obj);
	window.addEventListener("keydown", player.edge, true);
}

function tick() {
	stage.update();
//	player.update();
}

init();
