
function init() {

	world = new b2World( new b2Vec2(0, 10), true);

	stage = new Stage(canvas);

	width = canvas.width;
	height = canvas.height;

	//background
	createBox(350,008,350,415,0.9,1,.5,b2Body.b2_staticBody,null);
	createBox(350,008,350,010,0.9,1,.5,b2Body.b2_staticBody,null);
	createBox(008,350,008,350,0.9,1,.5,b2Body.b2_staticBody,null);
	createBox(008,350,595,350,0.9,1,.5,b2Body.b2_staticBody,null);

	//boxCar
	boxCar = createBox(43,10,60,375,30.0,0.0,.4,b2Body.b2dynamicBody,document.getElementById("car"));
	join1  = createBox(05,05,35,375,30.0,0.0,.4,b2Body.b2dynamicBody,null);
	join2  = createBox(05,05,87,375,30.0,0.0,.4,b2Body.b2dynamicBody,null);

	//wheels
	wheel1 = createBall(35,390,0.1,.4,.3,b2Body.b2_dynamicBody,document.getElementById("roda"));
	wheel2 = createBall(87,390,0.1,.4,.3,b2Body.b2_dynamicBody,document.getElementById("roda"));

	createCar(boxCar, join1, 35, 375,  wheel1, 35, 390, join2, 87, 375, wheel2, 87, 390);

	//debugDraw();

	ground = new Ground();
	ground.x = 0;
	ground.y = 0;
	ground.create();
	stage.addChild(ground.obj);
	stage.addChild(ground.obj2);

	ground1 = new Ground1();
	ground1.x = 0;
	ground1.y = 100;
	ground1.create1();
	stage.addChild(ground1.obj);
	stage.addChild(ground1.obj2);

//	for(var i = 0; i < 40; i++){
//	obstacle = new Obstacle();
//	obstacle.x = 100;//width;
//	obstacle.y = 100;//270;
//	obstacle.create();
//	obstacle.box2D(world);
//	stage.addChild(obstacle.obj);
//	}

//	player = new Player();
//	player.x = 10;
//	player.y = 190;
//	player.create();
//	player.box2D(world);
//	stage.addChild(player.obj);

	// frames per second
	Ticker.setFPS(16);
	Ticker.addListener(window);

};

function tick() {

	stage.update();
	ground1.update();
	ground.update();

	world.Step(1 / 60, 10, 10);
	world.DrawDebugData();

	for(var b = world.m_bodyList; b != null; b = b.m_next){
		if(b.GetUserData()){
			ctx.save();
			ctx.translate(b.GetPosition().x*SCALE,b.GetPosition().y*SCALE);
			ctx.rotate(b.GetAngle());
			ctx.drawImage(b.GetUserData(),-b.GetUserData().width/2,-b.GetUserData().height/2);
			ctx.restore();
		}
	}

	world.ClearForces();

//	this.style.visibility = 'visible';
//	world.m_debugDraw.m_sprite.graphics.clear();
//	obstacle.update();
//	player.update();
};
