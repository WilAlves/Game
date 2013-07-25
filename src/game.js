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

	ground = new Ground();
	ground.x = 0;
	ground.y = 0;
	ground.create();
	stage.addChild(ground.obj);

	ground1 = new Ground1();
	ground1.x = 0;
	ground1.y = 50;
	ground1.create1();
	stage.addChild(ground1.obj);
	stage.addChild(ground1.obj2);

	player = new Player();
	player.x = width / 2;
	player.y = 280;
	player.create();
	stage.addChild(player.obj);
	window.addEventListener("keydown", player.edge, true);

}

function tick() {
	stage.update();
	ground1.update();
	}
