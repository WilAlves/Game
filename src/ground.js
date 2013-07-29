var Ground = function()
{
	var layer = "img/jsplatformer4_b0.png";
	var layers, layers0;

	var create = function() {
		layers = new Bitmap(layer);
		layers.x = canvas.width;
		layers.y = this.y;
		this.obj = layers;

		layers0 = new Bitmap(layer);
		layers0.x = -1095;
		layers0.y = this.y;
		this.obj2 = layers0;
	}
	var update = function() {
			var w = 1690;

			if(-layers.x >= w )
				layers.x = w;

			if(-layers0.x  >= w)
				layers0.x = w;

				layers.x -= 1;
				layers0.x -= 1;
	}

	return{
		create: create,
		update: update
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
