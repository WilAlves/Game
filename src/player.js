function Player(){
{
	var imgWheel = new Bitmap("../img/roda.png");

//	var keysDown = {};
//	addEventListener("keydown", function (e) {
//		keysDown[e.keyCode] = true;
//			}, false);
//
//	addEventListener("keyup", function (e) {
//			delete keysDown[e.keyCode];
//				}, false);




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

	return Player;
}
