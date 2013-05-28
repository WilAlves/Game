
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
	//	bg0.regX = bg01.image.width * 0.1;
	//	bg0.regY = bg01.image.height * 0.1;
	//	bg0.snapToPixel = true;
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
		bg0 = new Bitmap(bgImage1);
		bg0.x = this.x;
		bg0.y = this.y;
	//	bg0.regX = bg01.image.width * 0.1;
	//	bg0.regY = bg01.image.height * 0.1;
	//	bg0.snapToPixel = true;
		this.obj = bg0;
	}
	return{
		create: create
	}
}



