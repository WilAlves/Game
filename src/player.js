var Player = function()
{
	this.x = 0;
	this.y = 0;
	var image = "img/Bus1_1.png";
	var p = new BitmapAnimation();//obj player

	var create = function() {

		spriteSheet = {
			"animations": { "dead":[0, 1], "go":[2, 4], "run":[43,61], "down":[110,120], "jump":[62,75], "fly":[180, 188]},
			"images": [image],
			"frames": {"height": 141, "count": 9, "width": 161}};

		var ss = new SpriteSheet(spriteSheet);
		var player = new BitmapAnimation(ss);

		//Set up looping
		ss.getAnimation("dead").frequency = 3;
		ss.getAnimation("go").frequency = 8;
		ss.getAnimation("go").next = "dead";
//		ss.getAnimation("run").next = "dead";
//		ss.getAnimation("down").next = "dead";
//		ss.getAnimation("jump").next = "dead";
//		ss.getAnimation("fly").next = "dead";
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
			case 32:
				this.x = this.x + 1;
				break;
//			case 83:
//				p.gotoAndPlay("down");
//				break;
//			case 32:
//				p.gotoAndPlay("jump");
//				break;
//			case 87:
//				p.gotoAndPlay("fly");
//				break;
		}
	}

	var update = function() {
		this.obj.x = this.x;
		this.obj.y = this.y;
	}

	return {
		create: create,
		edge: edge,
		update: update
	}
}
