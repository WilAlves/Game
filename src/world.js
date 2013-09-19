var world, stage = null, canvas, width, heigth, SCALE = 32, ground, player, obstacle, Collision, skin, angle = Math.PI/6.5;

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
	world.SetDebugDraw(debugDraw);
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

	fixtureDef.shape =  new b2CircleShape(0.45);
	var createBall = world.CreateBody(bodyDef);

	createBall.CreateFixture(fixtureDef);

		return createBall;
}

function createRevolutionJoint(teste5, jx1, jy1, teste1, wx1, wy1)
{
	var revoluteJointDef = new b2RevoluteJointDef();
	revoluteJointDef.Initialize(teste5, teste1, teste1.GetWorldCenter());
	revoluteJointDef.maxMotorTorque = 1000.0;
	revoluteJointDef.motorSpeed = 0.0;
	revoluteJointDef.enableMotor = true;
	revoluteJointDef.lowerAngle = -Math.PI/2;
	revoluteJointDef.upperAngle = Math.PI*8;
	revoluteJointDef.enableLimit = true;
	world.CreateJoint(revoluteJointDef);
}
function createDistanceJoint(teste5, tx5, ty5, teste1, tx1, ty1)
{
	var myjoint = new b2DistanceJointDef();
	var worldAnchorOnBody1 = new b2Vec2(tx5/SCALE, ty5/SCALE);
	var worldAnchorOnBody2 = new b2Vec2(tx1/SCALE, ty1/SCALE);
	myjoint.Initialize(teste5, teste1, worldAnchorOnBody1,worldAnchorOnBody2);
	myjoint.collideConnected = true;
	myjoint.frequencyHz = 1.0;
	myjoint.dampingRatio = 0.1;
	var distance_joint = world.CreateJoint(myjoint);

}
function createPrismaticJoint(teste5, tx5, ty5, teste1, tx1, ty1, teste2, tx2, ty2)
{
	var yy = Math.cos(angle);
	var xx = Math.sin(angle);
	var prismaticJointDef = new b2PrismaticJointDef();
	var worldaxis = new b2Vec2(xx,yy);
	prismaticJointDef.Initialize(teste5, teste1, teste2.GetWorldCenter(), worldaxis);
	prismaticJointDef.lowerTranslation = -10; // in the direction of vector
	prismaticJointDef.upperTranslation = 10; // opposite the direction of vector
	prismaticJointDef.enableLimit = false;
	var prismatic_joint1 = world.CreateJoint(prismaticJointDef);

	worldaxis.x = -xx;
	worldaxis.y = yy;
	prismaticJointDef.Initialize(teste5, teste1, teste2.GetWorldCenter(), worldaxis);
	var prismatic_joint2 = world.CreateJoint(prismaticJointDef);
}
