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
		console.log(tiles);
		return tiles;
	})();
	this.tiles = tiles;
	/* figure A.
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
	var faceRelations = [
		 {N:3, S:5, W:4, E:1}
		,{N:3, S:5, W:0, E:2}
		,{N:3, S:5, W:1, E:4}
		,{N:2, S:0, W:1, E:4}
		,{N:2, S:0, W:3, E:5}
		,{N:2, S:0, W:4, E:1}
	];

	this.rotate = function(n,clockwise){
		//n => faceNumber
		if(typeof n == "undefined" || parseInt(n) < 0 || parseInt(n) > 5) throw("n must be a side number [0-5]");
		var clockwise = typeof clockwise == "undefined" ? true : clockwise;
		var face = faceRelations[n];
		var self = this;
		var cfg = {//relation -> (neighbor faceNumber, direction on neighbor face to the triplet of interest), reverse triplet if rotated 90 CW)
			 N: {n: face.N, direction: getDirection(face.N, n), reverse:true}
			,S: {n: face.S, direction: getDirection(face.S, n), reverse:true}
			,W: {n: face.W, direction: getDirection(face.W, n), reverse:false}
			,E: {n: face.E, direction: getDirection(face.E, n), reverse:false}
		};
		var current_values = {
			 N: self.getTriplet( cfg.N.n, cfg.N.direction)
			,S: self.getTriplet( cfg.S.n, cfg.S.direction)
			,W: self.getTriplet( cfg.W.n, cfg.W.direction)
			,E: self.getTriplet( cfg.E.n, cfg.E.direction)
		};
		if (clockwise){
			this.setTriplet(face.E, cfg.E.direction, reverseIf(current_values.N, cfg.N.reverse));
			this.setTriplet(face.S, cfg.S.direction, reverseIf(current_values.E, cfg.E.reverse));
			this.setTriplet(face.W, cfg.W.direction, reverseIf(current_values.S, cfg.S.reverse));
			this.setTriplet(face.N, cfg.N.direction, reverseIf(current_values.W, cfg.W.reverse));
		} else {
			this.setTriplet(face.E, cfg.E.direction, reverseIf(current_values.S, !cfg.S.reverse));
			this.setTriplet(face.S, cfg.S.direction, reverseIf(current_values.W, !cfg.W.reverse));
			this.setTriplet(face.W, cfg.W.direction, reverseIf(current_values.N, !cfg.N.reverse));
			this.setTriplet(face.N, cfg.N.direction, reverseIf(current_values.E, !cfg.E.reverse));
		}
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
		 N: {horizontal:true, n:2}
		,S: {horizontal:true, n:0}
		,W: {horizontal:false,n:0}
		,E: {horizontal:false,n:2}
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
			var otherDirection = getDirection(otherFace,n);
			var cfg = directions[otherDirection];
			return mapThree(cfg.horizontal ? function(x){
				return tiles[otherFace][x][cfg.i];
			} : function(y){
				return tiles[otherFace][cfg.i][y];	
			});
		};
	})();
	function getDirection(from,to){
		var arr = faceRelations[from];
		for(var k in arr){
			if(arr[k] == to){
				return k;
			}
		}
		return null;
	}

	/*
	* figure C.
	*
		Opposites
		---------
		   0,2
		   1,4
		   3,5


	 * figure D.
	 *
		Rotation Face            Affected Faces
		-------------            --------------
			  0                      1,3,4,5
			  2                      1,3,4,5
			  1                      0,2,3,5
			  4                      0,2,3,5
			  3                      0,1,2,4
			  5                      0,1,2,4


	* figure E.
	*
		Rotation Face   Affected Faces (with Deltas)(CW rotation)
		-------------   -----------------------------------------
	          0      	1: 
		      1
		      2
		      3
		      4
		      5

	*/
}
Cube.COLORS = [
	 "White"
	,"Orange"
	,"Yellow"
	,"Green"
	,"Red"
	,"Blue"
];

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
