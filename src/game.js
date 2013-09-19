
function init() {

	world = new b2World( new b2Vec2(0, 10), true);

	stage = new Stage(canvas);

	width = canvas.width;
	height = canvas.height;

	//background
	createBox(350,008,350,415,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(350,008,350,010,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,350,008,350,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,350,595,350,40,.8,.1,b2Body.b2_staticBody,false,null);

	//joints and ball left
	joint1_1 = createBox(03,05,275,375,40,.8,.1,b2Body.b2_dynamicBody,true,null);
	ball1    = createBall(     275,385,40,.8,1,b2Body.b2_dynamicBody,document.getElementById("roda"));

	//joints and ball right
	joint2_2 = createBox(03,05,325,375,40,.8,.1,b2Body.b2_dynamicBody,true,null);
	ball2    = createBall (    328,385,40,.8,1,b2Body.b2_dynamicBody,document.getElementById("roda"));

	axle     = createBox(45,15,300,370,30,.8,1,b2Body.b2_dynamicBody,true,document.getElementById("car"));

	createRevolutionJoint(joint1_1, 275, 375, ball1, 275, 385);
	createPrismaticJoint( axle, 300, 370, joint1_1, 275, 375, ball1, 275, 385);

	createRevolutionJoint(joint2_2, 325, 375, ball2, 328, 385);
	createPrismaticJoint( axle, 385, 375, joint2_2, 325, 375, ball2, 328, 385);
//	createDistanceJoint(joint1_1, 200, 385, ball1, 200, 370);


	//

	debugDraw();

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
