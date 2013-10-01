function RubiksCube(withNumbers) {
	//initialization
	new Observable(this);
	this.faces = [];
	var self = this;
	reset();

	//
	// public API
	//
	
	this.reset = reset;

	this.isSolved = function(){
		return this.faces.every(function(face){
			var facecolors = face.triplets.reduce(function(flatface, triplet){
				return flatface.concat(
					triplet.map(function(tile){ return tile.color; })
				);	
			},[]);
			return facecolors.every(function(color){
				return color == facecolors[0];
			});
		});
	};

	this.scramble = function(moves){
		var moves = (typeof moves == "number") ? moves : 20;
		if(moves > 0){
			this.rotateRandom();
			var cube = this;
			setTimeout(function(){
				cube.scramble(moves - 1);
			}, 20);
		}
	};

	this.rotateRandom = function(){
		var faceNum = Math.floor(Math.random() * 6);
		var clockWise = Math.floor(Math.random() * 10) < 5;
		cube.rotate(faceNum,clockWise);
	};

	this.rotate = function(faceId,clockwise){
		this.notifyObservers('rotateStart',faceId);
		RubiksCube.ENFORCE_VALID_FACE_ID(faceId);
		var clockwise = typeof clockwise != "boolean" ? true : clockwise;//clockwise is the default rotation
		rotateFrontTriplets(faceId,clockwise);
		rotateNeighborTriplets(faceId,clockwise);
		this.notifyObservers('rotateEnd',faceId);
		this.notifyObservers('change');
		return this;
	};

	//
	//private helpers
	//

	function rotateFrontTriplets(faceId,clockwise){
		//read each triplet, save as we go
		var selfTriplets = [];
		for(var r=0; r<3; r++){
			selfTriplets.push( getTriplet(faceId, true, r) );//read each row
		}
		//set each triplet, using the data we saved, according to movement parameters
		var selfMovements = RubiksCube.SELF_MOVEMENTS[clockwise ? "CLOCKWISE" : "COUNTERCLOCKWISE"];
		for(var k in selfMovements){
			var movement = selfMovements[k];
			var triplet = selfTriplets[movement.from];
			if(!clockwise){ triplet = triplet.reverse(); }
			setTriplet(faceId, false, movement.to, triplet);//set each column
		}
	}

	function rotateNeighborTriplets(faceId,clockwise){
		var relations = RubiksCube.FACE_RELATIONS[faceId];
		var relation, movement, neighborTriplets = {};
		//read each triplet, save as we go
		for(var k in relations){
			relation = relations[k];
			neighborTriplets[k] = getTriplet(relation.relatedFace, relation.axisIsRow, relation.relatedIndex);
		}
		var movements = RubiksCube.NEIGHBOR_MOVEMENTS[clockwise ? "CLOCKWISE" : "COUNTERCLOCKWISE"];
		//set each triplet, using the data we saved, according to movement parameters
		for(var i=0; i<4; i++){
			movement = movements[i];
			var fromRelation = relations[movement.from];
			var toRelation = relations[movement.to];
			//I need the axisIsReversed value between the FROM and TO,which is stored in the FACE_RELATIONS[movement.from],
			//	where relatedFace == movement.to
			var neighborTriplet = neighborTriplets[movement.from];
			var relationsFrom = RubiksCube.FACE_RELATIONS[fromRelation.relatedFace];
			var reverseTheTriplet = false;
			for (var k in relationsFrom){
				if(relationsFrom[k].relatedFace == toRelation.relatedFace){
					reverseTheTriplet = relationsFrom[k].axisIsReversed;
					break;
				}
			}
			if(reverseTheTriplet){ neighborTriplet = neighborTriplet.reverse(); }
			setTriplet(toRelation.relatedFace, toRelation.axisIsRow, toRelation.relatedIndex, neighborTriplet);
		}
	}

	function getTriplet(faceId, isRow, index){//presents a row/column triplet for a particular face as a simple, length-3 array
		var result = [];
		var face = self.faces[faceId];
		for(var i=0; i<3; i++){
			result.push(
				isRow ? face.triplets[index][i] : face.triplets[i][index]
			);
		}
		return result;
	}

	function setTriplet(faceId, isRow, index, triplet){//sets a row/column triplet with a simple, length-3 array
		if(triplet === undefined || triplet.length != 3){ throw("triplet data must be an array of size 3"); }
		if(isRow){
			self.faces[faceId].triplets[index] = triplet;
		} else {
			for(var i=0; i<3; i++) self.faces[faceId].triplets[i][index] = triplet[i];
		}
	}

	function reset(){
		var i = 0;
		for(var faceNum=0; faceNum<6; faceNum++){
			var face = self.faces[faceNum] = { triplets: [] };
			for(var x=0; x<3; x++){
				face.triplets[x] = [];
				for(var y=0; y<3; y++){
					face.triplets[x][y] = withNumbers ? i : { color: RubiksCube.COLORS[faceNum] };
					i++;
				}
			}
		}
		self.notifyObservers('reset');
	}
}
RubiksCube.SELF_MOVEMENTS = {
	CLOCKWISE: [
		 {from:0, to:2}
		,{from:1, to:1}
		,{from:2, to:0}
	]
	,COUNTERCLOCKWISE: [
		 {from:0, to:0}
		,{from:1, to:1}
		,{from:2, to:2}
	]
};
RubiksCube.NEIGHBOR_MOVEMENTS = {
	CLOCKWISE: [
		 {from:"N", to:"E"}
		,{from:"E", to:"S"}
		,{from:"S", to:"W"}
		,{from:"W", to:"N"}
	]
	,COUNTERCLOCKWISE: [
		 {from:"N", to:"W"}
		,{from:"W", to:"S"}
		,{from:"S", to:"E"}
		,{from:"E", to:"N"}
	]
};
RubiksCube.COLORS = [
	 "White"
	,"Orange"
	,"Yellow"
	,"Red"
	,"Green"
	,"Blue"
];
RubiksCube.COLOR_CODES = [
	 "W"
	,"O"
	,"Y"
	,"R"
	,"G"
	,"B"
];
RubiksCube.FACES = [
	 "Front" 
	,"Right" 
	,"Back"  
	,"Left"  
	,"Top"   
	,"Bottom"
];
RubiksCube.TRIPLETS = {
	HORIZONTAL: [
		 "Top"
		,"Middle"
		,"Bottom"
	]
	,VERTICAL: [
		 "Left"
		,"Center"
		,"Right"
	]
};
RubiksCube.COLOR_ID_TO_INDEX = function(id){
	return RubiksCube.COLORS.indexOf(id);
};
RubiksCube.FACE_ID_IS_VALID = function(id){
	return (id != undefined) && (id in [0,1,2,3,4,5]);
};
RubiksCube.ENFORCE_VALID_FACE_ID = function(id){
	if( !RubiksCube.FACE_ID_IS_VALID(id) ){
		throw("faceId must be a one of: 0,1,2,3,4,5");
	}
};
RubiksCube.FACE_RELATIONS = [
	{
		 N: {relatedFace: 4, axisIsRow: true,  relatedIndex: 2, axisIsReversed: false}
		,S: {relatedFace: 5, axisIsRow: true,  relatedIndex: 0, axisIsReversed: false}
		,E: {relatedFace: 1, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 3, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 4, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
		,S: {relatedFace: 5, axisIsRow: false, relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 2, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 0, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 4, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true }
		,S: {relatedFace: 5, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 3, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 1, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 4, axisIsRow: false, relatedIndex: 0, axisIsReversed: true }
		,S: {relatedFace: 5, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,E: {relatedFace: 0, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 2, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 2, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true }
		,S: {relatedFace: 0, axisIsRow: true,  relatedIndex: 0, axisIsReversed: false}
		,E: {relatedFace: 1, axisIsRow: true,  relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 3, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true }
	},{
		 N: {relatedFace: 0, axisIsRow: true,  relatedIndex: 2, axisIsReversed: false}
		,S: {relatedFace: 2, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 1, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,W: {relatedFace: 3, axisIsRow: true,  relatedIndex: 2, axisIsReversed: false}
	}
];
