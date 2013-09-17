function RubiksCubePainter(cube, canvas, width, height){
	this.cube = cube;
	this.canvas = canvas;
	this.width = width;
	this.height = height;
	var ctx = canvas.getContext("2d");
	this.ctx = ctx;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	canvas.setAttribute('height',height);
	canvas.setAttribute('width',width);

	function paintFace(face, sideLength, x0, y0){
		face.forEach(function(triplet,r){
			triplet.forEach(function(tileColor,c){
				ctx.fillStyle = RubiksCubePainter.COLORS[tileColor];
				ctx.fillRect((sideLength * c) + x0, (sideLength * r) + y0, sideLength, sideLength);
				ctx.strokeStyle = RubiksCubePainter.COLORS.STROKE;
				ctx.strokeRect((sideLength * c) + x0, (sideLength * r) + y0, sideLength, sideLength);
			});
		});
	};
	var tileSize = width / 3;
	this.paint = function(){
		ctx.save();
		ctx.scale(0.5,0.5);
		ctx.translate(width/2, height/2);
		paintFace(this.cube.tiles[0],tileSize,0,0);
		ctx.save();
		ctx.scale(0.5,1);
		paintFace(this.cube.tiles[1],tileSize,2*width,0);
		paintFace(this.cube.tiles[3],tileSize,-width,0);
		ctx.restore();
		ctx.scale(1,0.5);
		paintFace(this.cube.tiles[4],tileSize,0,-height);
		paintFace(this.cube.tiles[5],tileSize,0,2*height);
		ctx.restore();
	};
}
RubiksCubePainter.COLORS = {
	 White:  "#eeeeee"
	,Yellow: "#eeee33"
	,Orange: "#ffcc66"
	,Red:    "#ff6666"
	,Green:  "#66cc66"
	,Blue:   "#6666ff"
	,STROKE: "#999999"
};
