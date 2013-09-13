var canvas,ctx;
function init(id, cube, callback){
	canvas = document.getElementById(id);
	canvas.width = 500;
	canvas.height = 500;
	ctx = canvas.getContext("2d");
	function paint(){
		draw(cube);
	}
	setInterval(paint, 500);
	paint();
	if(typeof callback === "function"){
		callback();
	}
}
function draw(cube){
	console.clear();
	cube.tiles.map(function(face){
		return face.map(function(xs){
			return xs.map(function(color){
				return colorCodes[color];	
			}).join(",");
		}).join("\n");
	}).forEach(function(face){
		console.log(face);
	});
	var sideLength = 50;
	ctx.scale(1,-1);
	ctx.save();
	//draw left
	ctx.transform(0.75,0.5,0,1,36,-75);
	drawFace(cube.tiles[4], sideLength, 0, 150);
	ctx.restore();
	//draw right
	ctx.save();
	ctx.transform(0.75,-0.5,0,1,(sideLength * 6),0);
	drawFace(cube.tiles[1], sideLength, 0, 150);
	ctx.restore();
	//draw top
	ctx.save();
	ctx.transform(-1,0,0,.75,0,50);
	drawFace(cube.tiles[3], sideLength, -300, 0);
	ctx.restore();
	//draw bottom
	ctx.save();
	ctx.transform(1,0,0,.75,150,0);
	drawFace(cube.tiles[5], sideLength, 0, -550);
	ctx.restore();
	//draw center
	drawFace(cube.tiles[0], sideLength, 150, 150);
}
function drawFace(face, sideLength, x0, y0){
	face.forEach(function(xs,x){
		xs.forEach(function(color, y){
			ctx.fillStyle = colorHex[color];
			ctx.beginPath();
			ctx.lineTo((x0 + sideLength * x), (y0 + sideLength * y));
			ctx.lineTo((x0 + sideLength * (x + 1)), (y0 + sideLength * y));
			ctx.lineTo((x0 + sideLength * (x + 1)), (y0 + sideLength * (y + 1)));
			ctx.lineTo((x0 + sideLength * x), (y0 + sideLength * (y + 1)));
			ctx.lineTo((x0 + sideLength * x), (y0 + sideLength * y));
			ctx.closePath();
			ctx.fill();
		});
	});
}
var colorCodes = {
	 White: "W"
	,Yellow: "Y"
	,Orange: "O"
	,Red: "R"
	,Green: "G"
	,Blue: "B"
};
var colorHex = {
	 White: "#eeeeee"
	,Yellow: "#eeee33"
	,Orange: "#ffcc66"
	,Red: "#ff6666"
	,Green: "#66cc66"
	,Blue: "#6666ff"
};
