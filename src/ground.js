
var Ground0 = function()
{
	this.x = 0;
	this.y = 0;
	var bgImage0 = "img/jsplatformer4_b0.png";

	var create = function()
	{
		bg0 = new Bitmap(bgImage0);
		bg0.x = this.x;
		bg0.y = this.y;
		bg0.regX = bg0.image.width * 0.1;
		bg0.regY = bg0.image.height * -0.001;
		bg0.snapToPixel = true;
		this.obj = bg0;
	}
	return{
		create: create
	}
}

var Ground1 = function()
{
	this.x = 0;
	this.y = 0;
	var bgImage1 = "img/jsplatformer4_b1.png";

	var create = function()
	{
		bg1 = new Bitmap(bgImage1);
		bg1.x = this.x;
		bg1.y = this.y;
		bg1.regX = bg1.image.width * 0.1;
		bg1.regY = bg1.image.height * -0.25;
		bg1.snapToPixel = true;
		this.obj = bg1;
	}
	return{
		create: create
	}
}



