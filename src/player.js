var Player = function()
{
	this.x = 0;
	this.y = 0;
	var image = "img/boy.png";
	var p = new BitmapAnimation();//obj player

	var create = function() {

		spriteSheet = {
			"animations": { "dead":[1, 10], "go":[16,30], "run":[43,61], "down":[110,120], "jump":[62,75], "fly":[180, 188]},
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
		ss.getAnimation("fly").next = "dead";
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
			case 68:
				p.gotoAndPlay("go");
				break;
			case 39:
				p.gotoAndPlay("run");
				break;
			case 83:
				p.gotoAndPlay("down");
				break;
			case 32:
				p.gotoAndPlay("jump");
				break;
			case 87:
				p.gotoAndPlay("fly");
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
