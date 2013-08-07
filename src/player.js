var Player = function()
{
	this.x = 0;
	this.y = 0;
	var image = "img/Bus1_1.png";
	var p = new BitmapAnimation();//obj player

	var create = function() {

		spriteSheet = {
			"animations": { "dead":[0, 1], "go":[2, 4]},
			"images": [image],
			"frames": {"height": 141, "width": 161}};

		var ss = new SpriteSheet(spriteSheet);
		var player = new BitmapAnimation(ss);

		//Set up looping
		ss.getAnimation("dead").frequency = 3;
		ss.getAnimation("go").frequency = 8;
		ss.getAnimation("go").next = "dead";
		player.gotoAndPlay("dead");

		player.x = this.x;
		player.y = this.y;
		this.obj = player;
		p = player;
	}

	var keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
			}, false);

	addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
				}, false);


	var update = function() {
		if(32 in keysDown)
			p.gotoAndPlay("go");
		if(39 in keysDown)
			p.x += 5;
			if((p.x + 170) > width)
				p.x = width - 172;
		if(37 in keysDown)
			p.x -= 10;
			if(p.x < 0)
				p.x = 0;
	}

	return {
		create: create,
	//	edge: edge,
		update: update
	}
}
