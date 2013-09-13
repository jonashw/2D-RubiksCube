function Face(tiles){
	if(tiles === undefined || tiles.length != 9){
		throw("Face(tiles): this constructor requires an array containing 9 tiles");
		//tiles should be in order: left to right, top to bottom; tile 0 is top-left, tile 8 is bottom-right;
	}
	var tiles = tiles;
	var triplets = {
		 Top:    [0,1,2]
		,Middle: [3,4,5]
		,Bottom: [6,7,8]	
		,Left:   [0,3,6]
		,Center: [1,4,7]
		,Right:  [2,5,8]
	};	
	var triplet_ids = [];
	for(var k in triplets){ triplet_ids.push(k); }
	this.getTriplet = function(id){
		if(!(id in triplets)){ throw("Face.getTriplet(id): invalid triplet id.  use one of: " + triplet_ids.join(",")); }
		var t = triplets[id];
		var x = tiles;
		return [x[t[0]],x[t[1]],x[t[2]]];
	}
}
