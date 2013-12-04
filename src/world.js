var world, stage = null, canvas, width, heigth, SCALE = 32, ground, player, obstacle, Collision, skin, angle = Math.PI/6.5, left = false, right = false, motorSpeed = 0, keysDown = {}, drawHillY = 123, x = 600;

var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2World = Box2D.Dynamics.b2World
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	, b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
	, b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
	, b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
	, b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2AABB = Box2D.Collision.b2AABB
	, b2Color = Box2D.Common.b2Color;

canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');

function debugDraw()
{
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(ctx);
	debugDraw.SetDrawScale(SCALE);//define scale
	debugDraw.SetFillAlpha(.1);    //define transparency
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	debugDraw = world.SetDebugDraw(debugDraw);

//	return debugDraw;
}

function createBox(width,height,pX,pY,a,b,c,type,sensor,data)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.Set(pX/SCALE,pY/SCALE);
	bodyDef.userData=data;

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = a;
	fixtureDef.friction = b;
	fixtureDef.restitution = c;
	fixtureDef.isSensor = sensor;

	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsBox(width/SCALE,height/SCALE);
	var Box = world.CreateBody(bodyDef);

	Box.CreateFixture(fixtureDef);

		return Box;
}

function createBall(pX,pY,a,b,c,type,data)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.Set(pX/SCALE,pY/SCALE);
	bodyDef.userData=data;

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = a;
	fixtureDef.friction = b;
	fixtureDef.restitution = c;

	fixtureDef.shape =  new b2CircleShape(0.45);
	var Ball = world.CreateBody(bodyDef);

	Ball.CreateFixture(fixtureDef);

		return Ball;
}

function createRevolutionJoint(axle, ax, ay, joint, jx, jy)
{
	var revoluteJointDef = new b2RevoluteJointDef();
	revoluteJointDef.Initialize(axle, joint, joint.GetWorldCenter());
	revoluteJointDef.maxMotorTorque = 10000;
i//	revoluteJointDef.motorSpeed = 0.0;
	revoluteJointDef.enableMotor = true;
	var jointRev = world.CreateJoint(revoluteJointDef);

	return jointRev;
}

function createDistanceJoint(joint_, jx, jy, ball, bx, by)
{
	var myjoint = new b2DistanceJointDef();
	var worldAnchorOnBody1 = new b2Vec2(jx/SCALE, jy/SCALE);
	var worldAnchorOnBody2 = new b2Vec2(bx/SCALE, by/SCALE);
	myjoint.Initialize(joint_, ball, worldAnchorOnBody1,worldAnchorOnBody2);
//	myjoint.collideConnected = true;
	myjoint.frequencyHz = 0.001;
	myjoint.dampingRatio = 10;
	var jointDist = world.CreateJoint(myjoint);

	return jointDist;
}

function createPrismaticJoint(axle, axl, ayl, joint1, jtx1, jty1, joint2, jyx2, jty2)
{
	var prismaticJointDef = new b2PrismaticJointDef();
	prismaticJointDef.lowerTranslation = -20/SCALE; // in the direction of vector
	prismaticJointDef.upperTranslation = 5/SCALE; // opposite the direction of vector
	prismaticJointDef.enableMotor = true;
	prismaticJointDef.enableLimit = true;
//	var yy = Math.cos(angle);
//	var xx = Math.sin(angle);
	var worldaxis = new b2Vec2(0,1);
	prismaticJointDef.Initialize(axle, joint1, joint1.GetWorldCenter(), worldaxis);
	var prismatic_joint1 = world.CreateJoint(prismaticJointDef);

//	worldaxis.x = -xx;
//	worldaxis.y = yy;
	prismaticJointDef.Initialize(axle, joint2, joint2.GetWorldCenter(), worldaxis);
	var prismatic_joint2 = world.CreateJoint(prismaticJointDef);

//	return prismatic_joint1, prismatic_joint2;
}
/*
function drawHill(pixelStep,xOffset,yOffset)
	{
		var hillStartY = yOffset;
		var hillWidth = 640;
		var hillSliceWidth = hillWidth/pixelStep;
		var hillVector = {};
		var randomHeight = Math.random()*100;
		var j = 0, z = 0;
		if (xOffset!=0)
		{
			hillStartY -= randomHeight;
		}
		for (j = 0; j<hillSliceWidth; j++) {
			hillVector = {};
			var sliceBody = new b2BodyDef  ;
			var centre = findCentroid(hillVector,hillVector.length);
			sliceBody.position.Set(centre.x,centre.y);
			for (z=0; z<hillVector.length; z++) {
				hillVector[z].Subtract(centre);
			}
			var slicePoly=new b2PolygonShape  ;
			slicePoly.SetAsVector(hillVector,4);
			var sliceFixture=new b2FixtureDef  ;
				fixDef.shape.SetAsArray([
				new b2Vec2((j*pixelStep+xOffset)/SCALE,480/SCALE),
				new b2Vec2((j*pixelStep+xOffset)/SCALE,(hillStartY+randomHeight*Math.cos(2*Math.PI/hillSliceWidth*j))/SCALE),
				new b2Vec2(((j+1)*pixelStep+xOffset)/SCALE,(hillStartY+randomHeight*Math.cos(2*Math.PI/hillSliceWidth*(j+1)))/SCALE),
				new b2Vec2(((j+1)*pixelStep+xOffset)/SCALE,480/SCALE)
				]);
			sliceFixture.shape=slicePoly;
			var worldSlice=world.CreateBody(sliceBody);
			worldSlice.CreateFixture(sliceFixture);
		}
		hillStartY=hillStartY+randomHeight;
		return (hillStartY);
	}
function findCentroid(vs, count)
{
		var c = new b2Vec2();
		var i = 0;
		var area=0.0;
		var p1X=0.0;
		var p1Y=0.0;
		var inv3=1.0/3.0;
		for (i = 0; i < count; ++i) {
			var p2=vs[i];
			var p3=i+1<count?vs[i+1]:vs[0];
			var e1X=p2.x-p1X;
			var e1Y=p2.y-p1Y;
			var e2X=p3.x-p1X;
			var e2Y=p3.y-p1Y;
			var D = (e1X * e2Y - e1Y * e2X);
			var triangleArea=0.5*D;
			area+=triangleArea;
			c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
			c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
		}
		c.x*=1.0/area;
		c.y*=1.0/area;
		return c;
	}
*/

function drawHill(pixelStep, xOffset, yOffset)
{
	var hillStartY = yOffset;//Math.floor((Math.random()*150)+110); //Math.random()*200;
	var hillWidth = 600;
	var hillSlices = hillWidth / pixelStep;
	var hillPointX;
	var hillPointY;
	var points = new Array();

		var randomHeight = Math.random()*23;
		if(xOffset!=0)
		{
			hillStartY-=randomHeight;
		}
		for (var j=0; j<=hillSlices; j++)
		{
			hillPointX=j*pixelStep+xOffset;
			hillPointY=hillStartY-randomHeight*Math.sin(-(Math.PI/2)+2*Math.PI/hillSlices*j);
			if(j!=0)
			{
				var bodyDef = new b2BodyDef;
				bodyDef.type = b2Body.b2_kinematicBody;
				bodyDef.userData = document.getElementById("terrain");

				var fixDef = new b2FixtureDef;
				fixDef.density = 10.0;
				fixDef.friction = 0.5;
				fixDef.restitution = .5;
				fixDef.shape = new b2PolygonShape;
				fixDef.shape.SetAsArray([
						new b2Vec2(px/30, py/10),
						new b2Vec2(hillPointX/30 , hillPointY/10),
						new b2Vec2(hillPointX/30, 480/10),
						new b2Vec2(px/30, 480/10)
						]);
				var aa = world.CreateBody(bodyDef);
				aa.CreateFixture(fixDef);
				aa.SetLinearVelocity(new b2Vec2(-5,0));
			}
			px = hillPointX;
			py = hillPointY;
		}
		hillStartY = hillStartY+randomHeight;
	return (hillStartY);
}


////interaction keyboard
//var steerforward = false;
//var steerbackward = false;
//var resetcar = false;
////Interact
//$(window).keydown(function(e) {
//    var code = e.keyCode;
//	if(code == 39)
//		steerforward = true;
//	if(code == 37)
//		steerbackward = true;
//	if(code == 82)
//		resetcar = true;
//});
//$(window).keyup(function(e) {
//	var code2 = e.keyCode;
//	if(code2 == 39)
//		steerforward = false;
//	if(code2 == 37)
//		steerbackward = false;
//	if(code2 == 82)
//		resetcar = false;
//});

//
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//	switch(keysDown)
//	{
//		case 37:
//			left = true;
//			console.log("left");
//			break;
//		case 39:
//			right = true;
//			console.log("right");
//			break;
//	}
//	switch(keyup)
//	{
//		case 37:
//			left = false;
//			break;
//		case 39:
//			right = false;
//			break;
//	}

//	A.GetWorldCenter().x*30;
//interaction mouse
//function pressHandler( e ) {
//	var offset = { x: this.x - e.stageX };
//	e.onMouseMove = function ( ev ) {
//	if( ev.stageX < 480 )
//		if( ev.stageX + offset.x <= 380 && ev.stageX + offset.x >= 5 )
//			e.target.x = ev.stageX + offset.x;
//	}
//}
