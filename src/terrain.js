//var tes = terrainScroling.GetWorldCenter().x;
var terrain = function(pixelStep, xOffset, yOffset)
{
		var hillStartY = yOffset;//120;//Math.floor((Math.random()*150)+110); //Math.random()*200;
		var hillWidth = 600;//600/numberOfHills;
		var hillSlices = hillWidth / pixelStep;
		var hillPointX;
		var hillPointY;
		var points = new Array();

		var randomHeight = Math.random()*30;
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
					var bodyDefTerrain = new b2BodyDef;
					bodyDefTerrain.userData = this;
					bodyDefTerrain.type = b2Body.b2_kinematicBody;
					bodyDefTerrain.allowSleep = false;
					bodyDefTerrain.linearDamping = 10.0;
					bodyDefTerrain.position.x = -22;

					var fixDef = new b2FixtureDef;
					fixDef.density = 10.0;
					fixDef.friction = 0.5;
					fixDef.restitution = .5;
					fixDef.shape = new b2PolygonShape;

					points = [new b2Vec2(px/30, py/10), new b2Vec2(hillPointX/30, hillPointY/10), new b2Vec2(hillPointX/30, 480/10), new b2Vec2(px/30, 480/10)];

					fixDef.shape.SetAsArray(points, points.length);
					var aa = world.CreateBody(bodyDefTerrain);
					bb = aa.CreateFixture(fixDef);

				}
				px = hillPointX;
				py = hillPointY;
			}
			hillStartY = hillStartY+randomHeight;

	return(hillStartY);

}
