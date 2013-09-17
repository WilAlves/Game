var world, stage = null, canvas, width, heigth, SCALE = 32, ground, player, obstacle, Collision, skin;

var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2World = Box2D.Dynamics.b2World
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	, b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
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
	debugDraw.SetFillAlpha(1);    //define transparency
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
}

function createBox(width,height,pX,pY,a,b,c,type,data)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.Set(pX/SCALE,pY/SCALE);
	bodyDef.userData=data;

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = a;
	fixtureDef.friction = b;
	fixtureDef.restitution = c;

	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsBox(width/SCALE,height/SCALE);
	var createBox = world.CreateBody(bodyDef);

	createBox.CreateFixture(fixtureDef);

		return createBox;
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

	fixtureDef.shape =  new b2CircleShape(0.4);
	var createBall = world.CreateBody(bodyDef);

	createBall.CreateFixture(fixtureDef);

		return createBall;
}

function createCar(boxCar, join1, jx1, jy1,  wheel1, wx1, wy1, join2, jx2, jy2, wheel2, wx2, wy2)
{
	var revoluteJointDef = new b2RevoluteJointDef();
	revoluteJointDef.Initialize(boxCar, join1, join1.GetWorldCenter());
	revoluteJointDef.maxMotorTorque = 11000.0;
	revoluteJointDef.motorSpeed = 13.0;
	revoluteJointDef.enableMotor = true;
	world.CreateJoint(revoluteJointDef);

	revoluteJointDef.Initialize(boxCar, join2, join2.GetWorldCenter());
	revoluteJointDef.lowerAngle = -Math.PI/2;
	revoluteJointDef.upperAngle = Math.PI*8;
	revoluteJointDef.enableLimit = true;
	world.CreateJoint(revoluteJointDef);

	var myjoint = new b2DistanceJointDef();
	var worldAnchorOnBody1 = new b2Vec2(jx1/SCALE, jy1/SCALE);
	var worldAnchorOnBody2 = new b2Vec2(wx1/SCALE, wy1/SCALE);
	myjoint.Initialize(join1, wheel1, worldAnchorOnBody1,worldAnchorOnBody2);
	myjoint.collideConnected = true;
	myjoint.frequencyHz = 1.9;
	myjoint.dampingRatio = 0.9;
	var distance_joint = world.CreateJoint(myjoint);

	var myjoint2 = new b2DistanceJointDef();
	var worldAnchorOnBody11 = new b2Vec2(jx2/SCALE, jy2/SCALE);
	var worldAnchorOnBody22 = new b2Vec2(wx2/SCALE, wy2/SCALE);
	myjoint2.Initialize(join2, wheel2, worldAnchorOnBody11,worldAnchorOnBody22);
	myjoint2.collideConnected = true;
	myjoint2.frequencyHz = 1.0;
	myjoint2.dampingRatio = 0.1;
	var distance_joint2 = world.CreateJoint(myjoint2);
	return createCar;
}