
var Player = function(img)
{
	this.x = 0;
	this.y = 0;
	var image = "img/RushRun.png";
	var p = new BitmapAnimation();//obj player

	var create = function() {

		spriteSheet = {"animations": {
			"1-tentativa" : [0, 4]},
		"images": [image], "frames": {"regX": 0, "height": 36, "count": 15, "regY": 0, "width": 59}};

		var ss = new SpriteSheet(spriteSheet);
		var player = new BitmapAnimation(ss);

		//Set up looping
		ss.getAnimation("1-tentativa").next = "1-tentativa";
		player.gotoAndPlay("1-tentativa");

		player.x = this.x;
		player.y = this.y;
		player.snapToPixel = true;
		player.mouseEnabled = false;
		this.obj = player;
		p = player;
	}
/*
	var update = function() {
		this.obj.x = this.x;
		this.obj.y = this.y;
	}
*/
	return {
		create: create,
//		update: update,
	}
}
