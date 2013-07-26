var Ground = function()
{
	var layer = "img/jsplatformer4_b0.png";
	var layers;

	var create = function() {
				layers = new Bitmap(layer);
				layers.x = this.x;
				layers.y = this.y;
				this.obj = layers;
	}

	return{
		create: create
	}
}

var Ground1 = function()
{
	var layer1 = "img/jsplatformer4_b1.png";
	var layers1, layers2;

	var create1 = function() {

		layers1 = new Bitmap(layer1);
		layers1.x = canvas.width;
		layers1.y = this.y;
		this.obj = layers1;

		layers2 = new Bitmap(layer1);
		layers2.x = -1104.5;
		layers2.y = this.y;
		this.obj2 = layers2;

	}
	var update = function() {
			var w = 1700;

			if(-layers1.x >= w )
				layers1.x = w;

			if(-layers2.x  >= w)
				layers2.x = w;

				layers1.x -= 5;
				layers2.x -= 5;
	}

	return{
		create1: create1,
		update: update
	}
}
