//var Ground = function()
//{
	var layer = new Array('img/jsplatformer4_b0.png','img/jsplatformer4_b1.png')
//	new ParallaxScrolling(ctx, layer);

	function Layer(s, x, y) {
		this.img = new Image();
		this.img.src = s;
		this.x = x;
		this.y = y;
	}


	function ParallaxScrolling(ctx, imgdata) {
		var scroll = this;
		if( typeof imgdata === 'undefined' ) imgdata = [];
			this.ctx = ctx;
			this.layers = new Array(imgdata.length);
			for(i=0; i<imgdata.length; i++) {
				this.layers[i] = new Layer(imgdata[i], 0, 0);
			}
			this.Move = function() {
			for(var i=1; i<scroll.layers.length; i++) {
				if( scroll.layers[i].x > scroll.layers[i].img.width ) scroll.layers[i].x = 0;
					scroll.layers[i].x += i;
				}
			};
			this.Draw = function() {
				scroll.Move();
				for(var i=0; i<scroll.layers.length; i++) {
					var x1 = (scroll.layers[i].x-scroll.layers[i].img.width);
					scroll.ctx.drawImage(scroll.layers[i].img, 0, 0, scroll.layers[i].img.width, scroll.layers[i].img.height, scroll.layers[i].x, 0,     scroll.layers[i].img.width, scroll.layers[i].img.height);
					scroll.ctx.drawImage(scroll.layers[i].img, 0, 0, scroll.layers[i].img.width, scroll.layers[i].img.height,x1, 0, scroll.layers[i].img.width, scroll.layers[i].img.height);
				}
			}
	}
//	return{
//		Layer: Layer,
//		ParallaxScrolling: ParallaxScrolling
//	}
//}
