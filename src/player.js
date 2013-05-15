
var Player = function()
{
	this.x = 0;
	this.y = 0;
	var image = "img/boy.png";
	var p = new BitmapAnimation();//obj player

	var create = function() {

		spriteSheet = {
			"animations": { "dead":[0, 15], "go":[16,31], "run":[32,46], "down":[111,127], "jump":[48,64]},
			"images": [image],
			"frames": {"regX": 0, "height": 37, "count": 464, "regY": 0, "width": 37}};

		var ss = new SpriteSheet(spriteSheet);
		var player = new BitmapAnimation(ss);

		//Set up looping
		ss.getAnimation("dead").next = "dead";
		ss.getAnimation("go").next = "dead";
		ss.getAnimation("run").next = "dead";
		ss.getAnimation("down").next = "dead";
		ss.getAnimation("jump").next = "dead";
		player.gotoAndPlay("dead");

		player.x = this.x;
		player.y = this.y;
		player.snapToPixel = true;
		player.mouseEnabled = false;
		this.obj = player;
		p = player;
	}

	var edge = function(e){
		switch (e.keyCode){
			case 38:
				p.gotoAndPlay("go");
				break;
			case 40:
				p.gotoAndPlay("run");
				break;
			case 90:
				p.gotoAndPlay("down");
				break;
			case 66:
				p.gotoAndPlay("jump");
				break;
		}
	}
/*
	var update = function() {
		this.obj.x = this.x;
		this.obj.y = this.y;
	}
*/
	return {
		create: create,
		edge: edge
//		update: update,
	}
}
