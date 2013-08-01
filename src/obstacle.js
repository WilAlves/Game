var Obstacle = function()
{
	var obstacle = "img/arvore.png";
	var obstacles, i = 0;

	var create = function() {
		obstacles = new Bitmap(obstacle);
		obstacles.x = canvas.width;
		obstacles.y = this.y;
		this.obj = obstacles;
	}
	var update = function() {

			if(obstacles.x <= -80 )
				obstacles.x = canvas.width;

				obstacles.x -= 5 + i;
	}

	return{
		create: create,
		update: update
	}
}
