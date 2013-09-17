var Obstacle = function()
{
	var obstacle = "";//img/arvore.png";
	var obstacles, i = 0;

	var create = function() {
		obstacles = new Bitmap(obstacle);
		obstacles.x = 100;//canvas.width;
		obstacles.y = 100;//this.y;
		this.obj = obstacles;
	}
var box2D = function( world ) {
		var fixDef = new b2FixtureDef();
			fixDef.density = 1.0;
			fixDef.friction = 1.0;
			fixDef.restitution = 1.0;

		var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;

			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox(50,50);
//			bodyDef.position.x = 100;
//			bodyDef.position.y = 100;

			for (var i = 0; i < 4; i++) {
				bodyDef.type = b2Body.b2_dynamicBody;
				bodyDef.position.Set((Math.random() * 400) / SCALE, (Math.random() * 400) / SCALE);
				bodyDef.linearVelocity.Set((Math.random() * 12) + 2, (Math.random() * 12) + 2);
				fixDef.shape = new b2PolygonShape();
				fixDef.shape.SetAsBox(25 / SCALE, 25 / SCALE);
				world.CreateBody(bodyDef).CreateFixture(fixDef);
			}

			world.CreateBody(bodyDef).CreateFixture(fixDef);

	}
var update = function() {

//	if(obstacles.x <= -80 )
//		obstacles.x = canvas.width;

//	obstacles.x -= 5 + i;
}

	return{
		create: create,
		box2D: box2D,
		update: update
	}
}
