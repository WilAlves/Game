var ground, canvas, stage, player, width, heigth, obstacle;

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
	stage.addChild(ground.obj2);

	ground1 = new Ground1();
	ground1.x = 0;
	ground1.y = 50;
	ground1.create1();
	stage.addChild(ground1.obj);
	stage.addChild(ground1.obj2);

	obstacle = new Obstacle();
	obstacle.x = width;
	obstacle.y = 270;
	obstacle.create();
	stage.addChild(obstacle.obj);
	player = new Player();

	player.x = 10;
	player.y = 190;
	player.create();
	stage.addChild(player.obj);

}

function tick() {
	stage.update();
	ground1.update();
	ground.update();
	obstacle.update();
	player.update();
	}
