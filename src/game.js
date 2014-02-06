	var y = 0;

function init() {

	//create world
	world = new b2World( new b2Vec2(0, 10), true);
	width = canvas.width;
	height = canvas.height;

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

	//joint all
	Y = createRevolutionJoint(roof, 275, 280, joint1, 250, 310);
	Y = createRevolutionJoint(roof, 275, 280, joint2, 290, 310);
	A = createRevolutionJoint(ball1, 250, 310, joint1, 250, 310);
	B = createRevolutionJoint(ball2, 300, 310, joint2, 300, 310);
	C = createPrismaticJoint( axle, 275, 290, joint1, 250, 310, joint2, 300, 310);

	//create debugDraw
	debugDraw();


	//background

	//created hill
	drawHillY = drawHill(10,x,drawHillY);

	//created obstacles


	//sound
	var somBd = document.getElementById("somBd");
	var som = document.getElementById("som");
	var som1 = document.getElementById("som1");

	somBd.play();
	if(state)
	{
		loop = setTimeout(update, 1000/60);
	}
};

function update() {

	if(x % 600 == 0)
		drawHillY = drawHill(10, x+600, drawHillY);

	if (37 in keysDown)
	{
		motorSpeed+=0.5;
		som1.play();
	}


	if (39 in keysDown)
	{
		motorSpeed-=0.5;
		som.play();
	}

	motorSpeed*=0.99;

	if (motorSpeed > 50)
		motorSpeed = 50;

	A.SetMotorSpeed(motorSpeed);
	B.SetMotorSpeed(motorSpeed);

	world.Step(1 / 30, 10, 10);
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

	document.getElementById("distance").innerHTML = y++;

	ctx.drawImage(imgBand, imgWin-=5, 250);

	if(y == 373)
	{
		GameOver();
	}

//	for (var currentBody = world.GetBodyList(); currentBody; currentBody=currentBody.GetNext())
//	{
//		if(currentBody.GetType() == b2Body.b2_kinematicBody)
//			if((currentBody.GetPosition().x*-1) > 6)
//				world.DestroyBody(currentBody);
//	}

	if(state)
	{
		loop = setTimeout(update, 1000/60);
	}
	world.ClearForces();
	x += 150;
};
