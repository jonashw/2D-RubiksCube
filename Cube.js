function Cube() {
	var tiles = (function(){
		var tiles = [];
		for(var f=0; f<6; f++){
			tiles[f] = [];
			for(var x=0; x<3; x++){
				tiles[f][x] = [];
				for(var y=0; y<3; y++){
					tiles[f][x][y] = Cube.COLORS[f];
				}
			}
		}
		return tiles;
	})();
	this.tiles = tiles;//expose data so it can be drawn

	//each face has four neighbors, one in each cardinal direction
	var faceRelations = [
		 {N:3, S:5, W:4, E:1}
		,{N:3, S:5, W:0, E:2}
		,{N:3, S:5, W:1, E:4}
		,{N:2, S:0, W:4, E:1}
		,{N:3, S:5, W:2, E:0}
		,{N:0, S:2, W:4, E:1}
	];

	//a face can be rotated one of two directions.  a movement direction indicates FROM where a triplet moves TO where a triplet moves.
	var movements = {
		clockwise: [
			 {from:'E',to:'N'}
			,{from:'S',to:'E'}
			,{from:'W',to:'S'}
			,{from:'N',to:'W'}
		]
	   	,counterclockwise: [
			 {from:'E',to:'S'}
			,{from:'S',to:'W'}
			,{from:'W',to:'N'}
			,{from:'N',to:'E'}
		]
	};

	this.rotate = function(faceId,clockwise){
		Cube.ENFORCE_VALID_FACE_ID(faceId);
		var clockwise = typeof clockwise == "undefined" ? true : clockwise;
		var faceNumber = Cube.FACE_ID_TO_INDEX(faceId);
		var face = faceRelations[faceNumber];
		var self = this;
		var directions = {
			 N: getCardinalDirection(face.N, faceNumber)
			,S: getCardinalDirection(face.S, faceNumber)
			,W: getCardinalDirection(face.W, faceNumber)
			,E: getCardinalDirection(face.E, faceNumber)
			                       // direction: from the center of the neighbor's face to the triplet of interest
								   // direction allows the correct triplet to be retrieved below.
		};
		var current_values = {
			//neighbor triplets
			 N: self.getTriplet( face.N, directions.N )
			,S: self.getTriplet( face.S, directions.S )
			,W: self.getTriplet( face.W, directions.W )
			,E: self.getTriplet( face.E, directions.E )
			//this-face triplets
			,n: self.getTriplet( faceNumber, 'N' )
			,s: self.getTriplet( faceNumber, 'S' )
			,w: self.getTriplet( faceNumber, 'W' )
			,e: self.getTriplet( faceNumber, 'E' )
		};

		var self = this;
		(clockwise ? 
			movements.clockwise :
			movements.counterclockwise
		).forEach(function(movement){
			var reverseTriplet = clockwise;
			var f = face[movement.from]
			var t = directions[movement.from];
			var neighbor_values = current_values[movement.to];
			var self_values = current_values[movement.to.toLowerCase()];
			if(reverseTriplet){
				//neighbor_values = neighbor_values.reverse(); 
				//self_values = self_values.reverse(); 
			}
			self.setTriplet(     f      , t , neighbor_values );
			self.setTriplet( faceNumber , t ,     self_values );
		});
	}
	/*
	* figure 8.c.
	*	
		Tile movement
		===============================
		(Clockwise) (Counter-clockwise)
		----------- -------------------
		   N -> E          E -> N
		   E -> S	       S -> E
		   S -> W	       W -> S
		   W -> N	       N -> W

	*/
	var directions = {
		 N: {horizontal:true,  n:2}
		,S: {horizontal:true,  n:0}
		,W: {horizontal:false, n:0}
		,E: {horizontal:false, n:2}
		   //horizontal: the tiles in this triplet align horizontally
		                    //n: the x/y/z slot number to which each tile in the triplet is to be moved 
	};
	this.getTriplet = function(faceNumber, direction){
		var dir = directions[direction];
		var results = [];
		for(var i=0; i<3; i++){
			results.push(dir.horizontal ?
				tiles[faceNumber][i][dir.n]
				:
				tiles[faceNumber][dir.n][i]
			);
		}
		return results;
	};
	this.setTriplet = function(faceNumber, direction, values){
		var dir = directions[direction];
		if(values.length != 3){
			throw("values must be an array of length 3");
		}
		for(var i=0; i<3; i++){
			if(dir.horizontal){
				tiles[faceNumber][i][dir.n] = values[i];
			} else {
				tiles[faceNumber][dir.n][i] = values[i];
			};
		}
	};
	var readFaceTriplet = (function(){
		return function(n,direction,fn){//provides read/write hooks to a particular 3 slots on a face
			//get the face related to face n via direction...
			var faceRelation = faceRelations[n];
			var otherFace = faceRelation[direction];
			var otherDirection = getCardinalDirection(otherFace,n);
			var cfg = directions[otherDirection];
			return mapThree(cfg.horizontal ? function(x){
				return tiles[otherFace][x][cfg.i];
			} : function(y){
				return tiles[otherFace][cfg.i][y];	
			});
		};
	})();
	function getCardinalDirection(from,to){
		var arr = faceRelations[from];
		for(var k in arr){
			if(arr[k] == to){
				return k;
			}
		}
		return null;
	}
	this.toData = function(){
		var faces = [];
		for(var i=0; i<6; i++){
			var grid = tiles[i];
			var flatenned_tiles = grid.reduce(function(acc,rows){
				return acc.concat(rows);
			},[]);
			faces.push(new Face(flatenned_tiles));
		}
		return new CubeData(faces);
	};
}
Cube.COLORS = [
	 "White"
	,"Orange"
	,"Yellow"
	,"Green"
	,"Red"
	,"Blue"
];
Cube.FACES = [
	 "Front" 
	,"Right" 
	,"Back"  
	,"Top"   
	,"Left"  
	,"Bottom"
];
Cube.FACE_ID_TO_INDEX = function(id){
	return Cube.FACES.indexOf(id);
};
Cube.FACE_ID_IS_VALID = function(id){
	return (id != undefined) && Cube.FACE_ID_TO_INDEX(id) >= 0;
};
Cube.ENFORCE_VALID_FACE_ID = function(id){
	if( !Cube.FACE_ID_IS_VALID(id) ){
		throw("faceId must be a one of: " + Cube.FACES.join(","));
	}
};


function mapThree(mfn){
	var results = [];
	for(var i=0; i<3; i++){
		results.push(mfn(i));
	}
	return results;
}
function reverseIf(array, bool){
	return bool ? array : array.reverse();
}
/*
 * figure A.
 *
	[0][1][2]	
		  [3][4][5]


 * figure B.a.
 *
	   [3]         [3]         [3]
	[4][0][1]---[0][1][2]---[1][2][4]
	   [5]         [5]         [5]
								|
							   [2]         [2]         [2]
							[1][5][4]---[3][4][5]---[4][3][1]
							   [0]         [0]         [0]

* figure B.b.
*
	   [N]            [2]                  
	[W] x [E]         [1]         [0][1][2]
	   [S]            [0]                  
*/
