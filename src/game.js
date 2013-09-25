
function init() {

	world = new b2World( new b2Vec2(0, 10), true);

	stage = new Stage(canvas);

	width = canvas.width;
	height = canvas.height;

	//background
	createBox(310,008,310,415,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(310,008,310,010,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,310,008,310,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,310,595,310,40,.8,.1,b2Body.b2_staticBody,false,null);
/*
	//axle Car
	roof     = createBox(30,07,275,345,10,.8,.2,b2Body.b2_dynamicBody,false,null);
	axle     = createBox(43,02,275,355,10,.8,.2,b2Body.b2_dynamicBody,false,document.getElementById("car"));

	//joints and ball left
	joint1   = createBox(05,05,250,375,10,.8,.2,b2Body.b2_dynamicBody,true,null);
	ball1    = createBall(     250,375,15,.5,.5,b2Body.b2_dynamicBody,document.getElementById("roda"));

	//joints and ball right
	joint2   = createBox(05,05,300,375,10,.8,.2,b2Body.b2_dynamicBody,true,null);
	ball2    = createBall (    300,375,15,.5,.5,b2Body.b2_dynamicBody,document.getElementById("roda"));

	Y = createRevolutionJoint(roof, 275, 345, joint1, 250, 375);
	Y = createRevolutionJoint(roof, 275, 345, joint2, 300, 375);

	A = createRevolutionJoint(ball1, 250, 375, joint1, 250, 375);
	B = createRevolutionJoint(ball2, 300, 375, joint2, 300, 375);

	C = createPrismaticJoint( axle, 275, 355, joint1, 250, 375, joint2, 300, 375);
*/
	debugDraw();

	terrainY = terrain(10, 0, terrainY);
	var carro = new car();
	carro.x = 10;
	carro.y = 10;

//	ground = new Ground();
//	ground.x = 0;
//	ground.y = 0;
//	ground.create();
//	stage.addChild(ground.obj);
//	stage.addChild(ground.obj2);
//
//	ground1 = new Ground1();
//	ground1.x = 0;
//	ground1.y = 100;
//	ground1.create1();
//	stage.addChild(ground1.obj);
//	stage.addChild(ground1.obj2);

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
//	ground1.update();
//	ground.update();

	if(x % 30 == 0)
	{
		console.log("agora");
		terrainY = terrain(10, (-x+30), terrainY);
	}
	x--;
	console.log(x);

	if (37 in keysDown)
	{
		console.log("left");
//		motorSpeed+=0.5;
	}
	if (39 in keysDown)
	{
		console.log("right");
//		motorSpeed-=0.5;
	}
	motorSpeed*=0.99;
	if (motorSpeed>100)
	{
//		motorSpeed=100;
	}
		console.log(motorSpeed);

//	A.SetMotorSpeed(motorSpeed);
//	B.SetMotorSpeed(motorSpeed);

	world.Step(1 / 60, 10, 10);
	world.DrawDebugData();

//	for(var b = world.m_bodyList; b != null; b = b.m_next){
//		if(b.GetUserData()){
//			ctx.save();
//			ctx.translate(b.GetPosition().x*SCALE,b.GetPosition().y*SCALE);
//			ctx.rotate(b.GetAngle());
//			ctx.drawImage(b.GetUserData(),-b.GetUserData().width/2,-b.GetUserData().height/2);
//			ctx.restore();
//		}
//	}
	//B.SetMotorSpeed(motorSpeed);
	//C.SetMaxMotorForce(Math.abs(600*frontAxlePrismaticJoint.GetJointTranslation()));
	//frontAxlePrismaticJoint.SetMotorSpeed((frontAxlePrismaticJoint.GetMotorSpeed()-2*frontAxlePrismaticJoint.GetJointTranslation()));
	//rearAxlePrismaticJoint.SetMaxMotorForce(Math.abs(600*rearAxlePrismaticJoint.GetJointTranslation()));
	//rearAxlePrismaticJoint.SetMotorSpeed((rearAxlePrismaticJoint.GetMotorSpeed()-2*rearAxlePrismaticJoint.GetJointTranslation()));

	world.ClearForces();

};
