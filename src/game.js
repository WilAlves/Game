function init() {

	//create world
	world = new b2World( new b2Vec2(0, 10), true);

	stage = new Stage(canvas);
	width = canvas.width;
	height = canvas.height;

	//background
//	createBox(310,008,310,415,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(310,008,310,010,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,310,008,310,40,.8,.1,b2Body.b2_staticBody,false,null);
	createBox(008,310,595,310,40,.8,.1,b2Body.b2_staticBody,false,null);

	//create car
	//axle Car
	roof     = createBox(25,07,275,280,.5,3,.3,b2Body.b2_dynamicBody,false,null);
	axle     = createBox(40,02,275,290,.5,3,.3,b2Body.b2_dynamicBody,false,document.getElementById("car"));
	//joints and ball left
	joint1   = createBox(05,05,250,310,.5,3,.3,b2Body.b2_dynamicBody,true,null);
	ball1    = createBall(   250,310,  1, 3,.1,b2Body.b2_dynamicBody,document.getElementById("roda"));
	//joints and ball right
	joint2   = createBox(05,05,300,310,.5,3,.3,b2Body.b2_dynamicBody,true,null);
	ball2    = createBall (  300,310,  1, 3,.1,b2Body.b2_dynamicBody,document.getElementById("roda"));
	Y = createRevolutionJoint(roof, 275, 280, joint1, 250, 310);
	Y = createRevolutionJoint(roof, 275, 280, joint2, 290, 310);
	A = createRevolutionJoint(ball1, 250, 310, joint1, 250, 310);
	B = createRevolutionJoint(ball2, 300, 310, joint2, 300, 310);
	C = createPrismaticJoint( axle, 275, 290, joint1, 250, 310, joint2, 300, 310);
//	axle.GetPosition().x = 0;

	//create debugDraw
	debugDraw();

	//created background
	drawHillY = drawHill(10,0,drawHillY);
	drawHillY = drawHill(10,600,drawHillY);
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

	//created obstacles
//	for(var i = 0; i < 40; i++){
//	obstacle = new Obstacle();
//	obstacle.x = 100;//width;
//	obstacle.y = 100;//270;
//	obstacle.create();
//	obstacle.box2D(world);
//	stage.addChild(obstacle.obj);
//	}

	// frames per second
	Ticker.setFPS(16);
	Ticker.addListener(window);

};

function tick() {

	stage.update();
	ground1.update();
	ground.update();


	document.getElementById("distance").innerHTML = x;
//	if(y ==  300)
//		alert("ganhou");
//	y++;

	if(x % 600 == 0)
	{
		drawHillY = drawHill(10, x+600, drawHillY);
//		x += 1;
	}
	x += 100;

	if (37 in keysDown)
	{
//		console.log("left");
		motorSpeed+=0.5;
	}
	if (39 in keysDown)
	{
//		console.log("right");
		motorSpeed-=0.5;
	}
	motorSpeed*=0.99;
	if (motorSpeed>100)
	{
		motorSpeed=100;
	}
//		console.log(motorSpeed);

	A.SetMotorSpeed(motorSpeed);
	B.SetMotorSpeed(motorSpeed);

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

};
