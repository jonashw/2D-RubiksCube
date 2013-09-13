function CubeData(faces){
	if(faces === undefined || faces.length != 6){  throw("CubeData(faces): faces must be an array of faces of length 6"); }
	var faces = faces;
	this.getFace = function(id){
		Cube.ENFORCE_VALID_FACE_ID(id);
		var index = Cube.FACE_ID_TO_INDEX(id)
		return faces[index];
	};
}
