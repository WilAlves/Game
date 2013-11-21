
var car = function()
{
	var xxx = 6;
	var yyy = 8;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.Set(xxx,yyy);

	var fixDef = new b2FixtureDef;
	fixDef.density = 40;
	fixDef.friction = .8;
	fixDef.restitution = 0.1;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(1,.2);

	var fx3 = new b2FixtureDef;
	fx3.isSensor = true;
	fx3.shape = new b2PolygonShape;
	fx3.shape.SetAsOrientedBox(.1,.3,new b2Vec2(-.7,.3),angle);

	var fx4 = new b2FixtureDef;
	fx4.isSensor = true;
	fx4.shape = new b2PolygonShape;
	fx4.shape.SetAsOrientedBox(.1,.3,new b2Vec2(.7,.3),-angle);

	var car = world.CreateBody(bodyDef);
	car.CreateFixture(fixDef);
	car.CreateFixture(fx3);
	car.CreateFixture(fx4);

	//AXLES
	axle_length = .1;
	bodyDef.position.Set(xxx+.9,yyy+.7);
	fixDef.density = 30;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(.1,.2);
	var axle1 = world.CreateBody(bodyDef);
	axle1.CreateFixture(fixDef);
	axle1.SetAngle(-angle);

	bodyDef.position.Set(xxx-.9,yyy+.7);
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(.1,.2);
	var axle2 = world.CreateBody(bodyDef);
	axle2.CreateFixture(fixDef);
	axle2.SetAngle(angle);

	//WHEEL
	var pos1 = new b2Vec2();
	pos1.x = axle1.GetWorldPoint(new b2Vec2(0,.1)).x;
	pos1.y = axle1.GetWorldPoint(new b2Vec2(0,.1)).y;
	bodyDef.position.Set(pos1.x,pos1.y);
	fixDef.shape = new b2CircleShape(.2);
	var wheel1 = world.CreateBody(bodyDef);
	wheel1.CreateFixture(fixDef);

	var pos2 = new b2Vec2();
	pos2.x = axle2.GetWorldPoint(new b2Vec2(0,.1)).x;
	pos2.y = axle2.GetWorldPoint(new b2Vec2(0,.1)).y;
	bodyDef.position.Set(pos2.x,pos2.y);
	fixDef.shape = new b2CircleShape(.2);
	var wheel2 = world.CreateBody(bodyDef);
	wheel2.CreateFixture(fixDef);

	//Revolute
	var revoluteJointDef = new b2RevoluteJointDef();
	revoluteJointDef.Initialize(axle1, wheel1, wheel1.GetWorldCenter());
	revoluteJointDef.maxMotorTorque = 1100.0;
	revoluteJointDef.motorSpeed = 0.0;
	revoluteJointDef.enableMotor = true;
	revoluteJointA = world.CreateJoint(revoluteJointDef);
	
	revoluteJointDef.Initialize(axle2, wheel2, wheel2.GetWorldCenter());
	revoluteJointB = world.CreateJoint(revoluteJointDef);
	
	//Prismatic
	var prismaticJointDef = new b2PrismaticJointDef();
	
	var yy = Math.cos(angle);
	var xx = Math.sin(angle);
	var worldaxis = new b2Vec2(xx,yy);
	prismaticJointDef.Initialize(car, axle1, wheel1.GetWorldCenter(), worldaxis);
	prismaticJointDef.lowerTranslation = -1; // in the direction of vector
	prismaticJointDef.upperTranslation = 1; // opposite the direction of vector
	prismaticJointDef.enableLimit = false;
	var prismatic_joint1 = world.CreateJoint(prismaticJointDef);
	
	worldaxis.x = -xx;
	worldaxis.y = yy;
	prismaticJointDef.Initialize(car, axle2, wheel2.GetWorldCenter(), worldaxis);
	var prismatic_joint2 = world.CreateJoint(prismaticJointDef);
	
	//Distance
	var myjoint = new b2DistanceJointDef();
	myjoint.frequencyHz = 0;
	myjoint.dampingRatio = 1;
	myjoint.Initialize(axle1, car, car.GetWorldCenter(),new b2Vec2(xxx+1,yyy+.35));
	var distance_joint2 = world.CreateJoint(myjoint);
	myjoint.Initialize(axle2, car, car.GetWorldCenter(),new b2Vec2(xxx-1,yyy+.35));
	var distance_joint1 = world.CreateJoint(myjoint);myjoint.collideConnected = true;
	
	return (car);
	//
	//		var cw = $('#cover').width();
	//		var dw = $('#canvas').width();
	//		var p2 = (car.GetWorldCenter().x)*30;
	//		var halfwidth = (cw/2);
	//		if((p2>halfwidth) && ((dw-p2)>halfwidth))
	//		{
	//			context.translate(-(p2-halfwidth),0);
	//		}
	//		else if((dw-p2)<halfwidth)	{
	//			context.translate(-(dw-cw),0);
	//		}
	//
	//		var pos = new Array();
	//		var length;
	//		pos[0] = car.GetWorldCenter().x*30;
	//
	//		function update() {
	//			world.Step(1 / 60, 10, 10);
	//			world.DrawDebugData();
	//			world.ClearForces();
	//
	//			if(steerforward == true)	{
	//				revoluteJointA.SetMotorSpeed(330);
	//				revoluteJointB.SetMotorSpeed(330);
	//			}
	//			if(steerforward == false && steerbackward == false)	{
	//				revoluteJointA.SetMotorSpeed(0);
	//				revoluteJointB.SetMotorSpeed(0);
	//			}
	//			if(steerbackward == true)	{
	//				revoluteJointA.SetMotorSpeed(-330);
	//				revoluteJointB.SetMotorSpeed(-330);
	//			}
	//			if(resetcar == true)	{
	//				car.SetPositionAndAngle(new b2Vec2(xxx,yyy),0);
	//				axle1.SetPositionAndAngle(new b2Vec2(xxx+2+axle_length*Math.sin(angle),yyy+.8+axle_length*Math.cos(angle)),-angle);
	//				axle2.SetPositionAndAngle(new b2Vec2(xxx-2-1.8*Math.sin(angle),yyy+.8+1.8*Math.cos(angle)),angle);
	//				wheel1.SetPositionAndAngle(new b2Vec2(axle1.GetWorldPoint(new b2Vec2(0,.5)).x,axle1.GetWorldPoint(new b2Vec2(0,.5)).y),0);
	//				wheel2.SetPositionAndAngle(new b2Vec2(axle2.GetWorldPoint(new b2Vec2(0,.5)).x,axle2.GetWorldPoint(new b2Vec2(0,.5)).y),0);
	//				var init = pos[length-1];
	//				pos.length = 0;
	//				pos[0] = xxx * 30;
	//				if((pos[0]>halfwidth) && ((dw-pos[0])>halfwidth))
	//				{
	//					if(init > (dw - halfwidth))
	//						context.translate(-(pos[0]-(dw-halfwidth)),0);
	//					else if(init < halfwidth)
	//						context.translate(-(pos[0]-halfwidth),0);
	//					else
	//						context.translate(-(pos[0]-init),0);
	//				}
	//				else if((dw-pos[0])<halfwidth)	{
	//					if(init > (dw - halfwidth))
	//						context.translate(0,0);
	//					else if(init < halfwidth)
	//						context.translate(-(dw-cw),0);
	//					else
	//						context.translate(-(dw-halfwidth-init),0);
	//				}
	//				else if(pos[0] < halfwidth)	{
	//					if(init < halfwidth)
	//						context.translate(0,0);
	//					else if(init > (dw - halfwidth))
	//						context.translate((dw-cw),0);
	//					else
	//						context.translate((init-halfwidth),0);
	//				}
	//				resetcar = false;
	//			}
	//
	//			var p = new b2Vec2();
	//			p = car.GetWorldCenter().x*30;
	//			pos.push(p);
	//			length = pos.length;
	//
	//			var s = (pos[length-1]-pos[length-2]); //in pixels
	//
	//			if((p>halfwidth) && ((dw-p)>halfwidth))
	//			{
	//				context.translate(-s,0);
	//			}
	//		};
	//}
	}
