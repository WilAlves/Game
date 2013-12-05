var world, stage = null, canvas, width, heigth, SCALE = 32, ground, player, obstacle, Collision, skin, angle = Math.PI/6.5, left = false, right = false, motorSpeed = 0, keysDown = {}, drawHillY = 115, x = 600, game = true;

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

	return debugDraw;
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
	myjoint.collideConnected = true;
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
	var worldaxis = new b2Vec2(0,1);
	prismaticJointDef.Initialize(axle, joint1, joint1.GetWorldCenter(), worldaxis);
	var prismatic_joint1 = world.CreateJoint(prismaticJointDef);

	prismaticJointDef.Initialize(axle, joint2, joint2.GetWorldCenter(), worldaxis);
	var prismatic_joint2 = world.CreateJoint(prismaticJointDef);

}

function drawHill(pixelStep, xOffset, yOffset)
{
	var hillStartY = yOffset;
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
				fixDef.density = .8;
				fixDef.friction = .8;
				fixDef.restitution = .8;
				fixDef.shape = new b2PolygonShape;
				points = [
						new b2Vec2(px/30, py/10),
						new b2Vec2(hillPointX/30 , hillPointY/10),
						new b2Vec2(hillPointX/30, 480/10),
						new b2Vec2(px/30, 480/10)
				];
				fixDef.shape.SetAsArray(points, points.lenght);
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

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
