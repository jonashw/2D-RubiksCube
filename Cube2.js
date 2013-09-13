
function Face(color){
	faces[i] = [];
	for(var i=0; i<6; i++){
		tiles[i] = color;
	}
}
function Cube() {
	var faces = (function(){
		var faces = [];
		for(var i=0; i<6; i++){
			faces[i] = new Face(Cube.COLORS);
		}
		console.log(faces);
		return faces;
	})();
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
		   [N]
		[W] x [E]
		   [S]

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

	* figure 8.d.
	*
		Precise Tile movement for N -> E
		================================
		
		

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
		if(typeof n == "undefined" || parseInt(n) < 0 || parseInt(n) > 5) throw("n must be a side number [0-5]");
		var clockwise = clockwise || true;
		if (clockwise){
			//of the North face, grab
			
		} else {

		}
	}
	function withFaceTriplet(n,direction){//provides read/write hooks to a particular 3 slots on a face
		//get the face related to face n via direction...
		var otherFace = faceRelations[n]
	}
	function findDirectionWhere(NSWE,colorIndex){
		for(var k in NSWE){
			if(NSWE[k] == colorIndex){
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
