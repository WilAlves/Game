var ground, canvas, stage, player, width, heigth;

function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');				//Usar na marcação das pontuações
	stage = new Stage(canvas);


	width = canvas.width;
	height = canvas.height;

	// frames per second
	Ticker.setFPS(16);
	Ticker.addListener(window);

	ground0 = new Ground0();
	ground0.x = 0;
	ground0.y = 0;
	ground0.create();
	stage.addChild(ground0.obj);

	ground1 = new Ground1();
	ground1.x = 0;
	ground1.y = 0;
	ground1.create();
	stage.addChild(ground1.obj);

	player = new Player();
	player.x = width / 2;
	player.y = height / 1.2;
	player.create();
	stage.addChild(player.obj);
	window.addEventListener("keydown", player.edge, true);

}

function tick() {
	stage.update();
//	player.update();
	}
