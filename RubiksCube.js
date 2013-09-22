function RubiksCube(withNumbers) {
	new Observable(this);
	this.moveDuration = 500;
	this.tiles = null;

	this.reset = function(){
		var i = 0;
		var tiles = [];
		for(var f=0; f<6; f++){
			tiles[f] = [];
			for(var x=0; x<3; x++){
				tiles[f][x] = [];
				for(var y=0; y<3; y++){
					tiles[f][x][y] = withNumbers ? i : { color: RubiksCube.COLORS[f] };
					i++;
				}
			}
		}
		this.tiles = tiles;
		this.notifyObservers('reset');
	};

	this.reset();

	this.isSolved = function(){
		return this.tiles.every(function(face){
			//face is a 3x3 array
			//flatface is a 9 array
			var facecolors = face.reduce(function(flatface, triplet){
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

	this.rotate = function(faceId,clockwise,zeroTime){
		RubiksCube.ENFORCE_VALID_FACE_ID(faceId);
		var clockwise = typeof clockwise != "boolean" ? true : clockwise;//clockwise is the default rotation
		var relations = RubiksCube.FACE_RELATIONS[faceId];
		//SELF TRIPLETS
		var selfTriplets = [];
		//read each triplet, save as we go
		for(var r=0; r<3; r++){
			selfTriplets.push( this.getTriplet(faceId, true, r) );
		}
		//set each triplet, using the data we saved, according to movement parameters
		var selfMovements = RubiksCube.SELF_MOVEMENTS[clockwise ? "CLOCKWISE" : "COUNTERCLOCKWISE"];
		for(var m in selfMovements){
			var movement = selfMovements[m];
			var triplet = selfTriplets[movement.from];
			if(!clockwise){ triplet = triplet.reverse(); }
			this.setTriplet(faceId, false, movement.to, triplet);
		}
		
		//NEIGHBOR TRIPLETS
		var relation;
		var neighborTriplets = {};
		//read each triplet, save as we go
		for(var d in relations){
			relation = relations[d];
			neighborTriplets[d] = this.getTriplet(relation.relatedFace, relation.axisIsRow, relation.relatedIndex);
			//if(relation.axisIsReversed){ neighborTriplets[d] = neighborTriplets[d].reverse(); }
		}
		var movements = RubiksCube.NEIGHBOR_MOVEMENTS[clockwise ? "CLOCKWISE" : "COUNTERCLOCKWISE"];
		var movement;
		//set each triplet, using the data we saved, according to movement parameters
		for(var m = 0; m<4; m++){
			movement = movements[m];
			var relationFrom = relations[movement.from];
			var relationTo = relations[movement.to];
			//I need the axisIsReversed value between the FROM and TO,which is stored in the FACE_RELATIONS[movement.from], where relatedFace == movement.to
			var neighborTriplet = neighborTriplets[movement.from];
			var relationsFrom = RubiksCube.FACE_RELATIONS[relationFrom.relatedFace];
			var reverseTheTriplet;
			for (var k in relationsFrom){
				if(relationsFrom[k].relatedFace == relationTo.relatedFace){
					reverseTheTriplet = relationsFrom[k].axisIsReversed;
					break;
				}
			}
			if(reverseTheTriplet){ neighborTriplet = neighborTriplet.reverse(); }
			this.setTriplet(relationTo.relatedFace, relationTo.axisIsRow, relationTo.relatedIndex, neighborTriplet);
		}
		this.notifyObservers('change');
		this.notifyObservers('moveEnd');
		return this;
	}
	this.getTriplet = function(faceId, isRow, index){
		var result = [];
		var face = this.tiles[faceId];
		if(isRow){
			for(var i=0; i<3; i++) result.push(face[index][i]);
		} else {
			for(var i=0; i<3; i++) result.push(face[i][index]);
		}
		return result;
	};
	this.setTriplet = function(faceId, isRow, index, triplet){
		if(triplet === undefined || triplet.length != 3){ throw("triplet data must be an array of size 3"); }
		if(isRow){
			this.tiles[faceId][index] = triplet;
		} else {
			for(var i=0; i<3; i++) this.tiles[faceId][i][index] = triplet[i];
		}
	};
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
		 N: {relatedFace: 4, axisIsRow: false, relatedIndex: 2, axisIsReversed: false }
		,S: {relatedFace: 5, axisIsRow: false, relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 2, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 0, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 4, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true }
		,S: {relatedFace: 5, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 3, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 1, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 4, axisIsRow: false, relatedIndex: 0, axisIsReversed: true}
		,S: {relatedFace: 5, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,E: {relatedFace: 0, axisIsRow: false, relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 2, axisIsRow: false, relatedIndex: 2, axisIsReversed: false}
	},{
		 N: {relatedFace: 2, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true }
		,S: {relatedFace: 0, axisIsRow: true,  relatedIndex: 0, axisIsReversed: false}
		,E: {relatedFace: 1, axisIsRow: true,  relatedIndex: 0, axisIsReversed: false}
		,W: {relatedFace: 3, axisIsRow: true,  relatedIndex: 0, axisIsReversed: true}
	},{
		 N: {relatedFace: 0, axisIsRow: true,  relatedIndex: 2, axisIsReversed: false}
		,S: {relatedFace: 2, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,E: {relatedFace: 1, axisIsRow: true,  relatedIndex: 2, axisIsReversed: true }
		,W: {relatedFace: 3, axisIsRow: true,  relatedIndex: 2, axisIsReversed: false }
	}
];
