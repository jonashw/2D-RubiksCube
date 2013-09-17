function faceTest(cube,faces,numbers){
	if(faces.length != 6){ throw("faceTest requires an array containing 6 3x3 arrays"); }
	for(var f=0; f<6; f++){
		var faceData = faces[f];
		var faceName = RubiksCube.FACES[f];
		for(var t=0; t<3; t++){
			var tripletData = faceData[t];
			var tripletName = RubiksCube.TRIPLETS.HORIZONTAL[t];
			var colors = numbers ? tripletData : tripletData.map(function(c){ return c.toUpperCase(); }).join(",");
			deepEqual(
				 cube.tiles[f][t]
				,faces[f][t]
				,"we expect that the " + faceName.toUpperCase() + " face has a " + tripletName.toUpperCase() + " triplet of " + colors);
		}
	}
}
