function printCube(cube,convertColors){
	var faces = cube.tiles.map(function(face){
		return face.map(function(triplet){
			return triplet.map(function(color){
				return convertColors ? Cube.COLOR_CODES[Cube.COLOR_ID_TO_INDEX(color)] : color;
			}).join(" ");
		}).join("\n");
	}).join("\n\n");
	console.log(faces);
}
