module("cube movements");
test("(no moves)",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["White","White","White"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","Blue"] );
});
test("F",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	cube.rotate("Front",true);
	tester.test("FRONT"  ,"TOP"     ,threeTimes("White") );
	tester.test("FRONT"  ,"MIDDLE"  ,threeTimes("White") );
	tester.test("FRONT"  ,"BOTTOM"  ,threeTimes("White") );
	tester.test("RIGHT"  ,"TOP"     ,["Green","Orange","Orange"]);
	tester.test("RIGHT"  ,"MIDDLE"  ,["Green","Orange","Orange"]);
	tester.test("RIGHT"  ,"BOTTOM"  ,["Green","Orange","Orange"]);
	tester.test("BACK"   ,"TOP"     ,threeTimes("Yellow"));
	tester.test("BACK"   ,"MIDDLE"  ,threeTimes("Yellow"));
	tester.test("BACK"   ,"BOTTOM"  ,threeTimes("Yellow"));
	tester.test("TOP"    ,"TOP"     ,threeTimes("Green"));
	tester.test("TOP"    ,"MIDDLE"  ,threeTimes("Green"));
	tester.test("TOP"    ,"BOTTOM"  ,threeTimes("Red"));
	tester.test("LEFT"   ,"TOP"     ,["Red","Red","Blue"]);
	tester.test("LEFT"   ,"MIDDLE"  ,["Red","Red","Blue"]);
	tester.test("LEFT"   ,"BOTTOM"  ,["Red","Red","Blue"]);
	tester.test("BOTTOM" ,"TOP"     ,threeTimes("Orange"));
	tester.test("BOTTOM" ,"MIDDLE"  ,threeTimes("Blue"));
	tester.test("BOTTOM" ,"BOTTOM"  ,threeTimes("Blue"));
});
test("F\'",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	cube.rotate("Front",false);
	tester.test("FRONT"  ,"TOP"     ,threeTimes("White") );
	tester.test("FRONT"  ,"MIDDLE"  ,threeTimes("White") );
	tester.test("FRONT"  ,"BOTTOM"  ,threeTimes("White") );
	tester.test("RIGHT"  ,"TOP"     ,["Blue","Orange","Orange"]);
	tester.test("RIGHT"  ,"MIDDLE"  ,["Blue","Orange","Orange"]);
	tester.test("RIGHT"  ,"BOTTOM"  ,["Blue","Orange","Orange"]);
	tester.test("BACK"   ,"TOP"     ,threeTimes("Yellow"));
	tester.test("BACK"   ,"MIDDLE"  ,threeTimes("Yellow"));
	tester.test("BACK"   ,"BOTTOM"  ,threeTimes("Yellow"));
	tester.test("TOP"    ,"TOP"     ,threeTimes("Green"));
	tester.test("TOP"    ,"MIDDLE"  ,threeTimes("Green"));
	tester.test("TOP"    ,"BOTTOM"  ,threeTimes("Orange"));
	tester.test("LEFT"   ,"TOP"     ,["Red","Red","Green"]);
	tester.test("LEFT"   ,"MIDDLE"  ,["Red","Red","Green"]);
	tester.test("LEFT"   ,"BOTTOM"  ,["Red","Red","Green"]);
	tester.test("BOTTOM" ,"TOP"     ,threeTimes("Red"));
	tester.test("BOTTOM" ,"MIDDLE"  ,threeTimes("Blue"));
	tester.test("BOTTOM" ,"BOTTOM"  ,threeTimes("Blue"));
});
test("U",function(){
	var cube = new Cube();
	cube.rotate("Top",true);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Yellow","Yellow","Yellow"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["White","White","White"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","Blue"] );
});
test("U\'",function(){
	var cube = new Cube();
	cube.rotate("Top",false);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["White","White","White"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["Yellow","Yellow","Yellow"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","Blue"] );
});
test("R",function(){
	var cube = new Cube();
	cube.rotate("Right",true);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["White","White","Blue"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","Blue"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","Blue"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Green","Yellow","Yellow"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Green","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Green","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","White"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","White"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","White"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","Yellow"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","Yellow"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","Yellow"] );
});
test("R\'",function(){
	var cube = new Cube();
	cube.rotate("Right",false);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["White","White","Green"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","Green"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","Green"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Blue","Yellow","Yellow"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Blue","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Blue","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","Yellow"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","Yellow"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","Yellow"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","White"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","White"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","White"] );
});
test("L",function(){
	var cube = new Cube();
	cube.rotate("Left",true);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["Green","White","White"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["Green","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["Green","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Yellow","Yellow","Blue"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Blue"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Blue"] );
	tester.test( "TOP"    ,"TOP"     ,["Yellow","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Yellow","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Yellow","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["White","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["White","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["White","Blue","Blue"] );
});
test("L\'",function(){
	var cube = new Cube();
	cube.rotate("Left",false);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["Blue","White","White"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["Blue","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["Blue","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Yellow","Yellow","Green"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Green"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Green"] );
	tester.test( "TOP"    ,"TOP"     ,["White","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["White","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["White","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Yellow","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Yellow","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Yellow","Blue","Blue"] );
});
test("FF\'",function(){
	var cube = new Cube();
	cube.rotate("Front",true);
	cube.rotate("Front",false);
	var tester = new TripletTester(cube);
	tester.fullTest([
		[    ["White","White","White"]
			,["White","White","White"]
			,["White","White","White"]
		],[  ["Orange","Orange","Orange"]
			,["Orange","Orange","Orange"]
			,["Orange","Orange","Orange"]
		],[  ["Yellow","Yellow","Yellow"]
			,["Yellow","Yellow","Yellow"]
			,["Yellow","Yellow","Yellow"]
		],[  ["Green","Green","Green"]
			,["Green","Green","Green"]
			,["Green","Green","Green"]
		],[  ["Red","Red","Red"]
			,["Red","Red","Red"]
			,["Red","Red","Red"]
		],[  ["Blue","Blue","Blue"]
			,["Blue","Blue","Blue"]
			,["Blue","Blue","Blue"]
		]
	]);
});
test("FF\'",function(){
	var cube = new Cube();
	cube.rotate("Front",true);
	cube.rotate("Front",false);
	var tester = new TripletTester(cube);
	tester.test( "FRONT"  ,"TOP"     ,["White","White","White"] );
	tester.test( "FRONT"  ,"MIDDLE"  ,["White","White","White"] );
	tester.test( "FRONT"  ,"BOTTOM"  ,["White","White","White"] );
	tester.test( "RIGHT"  ,"TOP"     ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"MIDDLE"  ,["Orange","Orange","Orange"] );
	tester.test( "RIGHT"  ,"BOTTOM"  ,["Orange","Orange","Orange"] );
	tester.test( "BACK"   ,"TOP"     ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"MIDDLE"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "BACK"   ,"BOTTOM"  ,["Yellow","Yellow","Yellow"] );
	tester.test( "TOP"    ,"TOP"     ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"MIDDLE"  ,["Green","Green","Green"] );
	tester.test( "TOP"    ,"BOTTOM"  ,["Green","Green","Green"] );
	tester.test( "LEFT"   ,"TOP"     ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"MIDDLE"  ,["Red","Red","Red"] );
	tester.test( "LEFT"   ,"BOTTOM"  ,["Red","Red","Red"] );
	tester.test( "BOTTOM" ,"TOP"     ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"MIDDLE"  ,["Blue","Blue","Blue"] );
	tester.test( "BOTTOM" ,"BOTTOM"  ,["Blue","Blue","Blue"] );
});
test("U\'F",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	cube.rotate("Top",false);
	cube.rotate("Front",true);
	tester.test("FRONT"  ,"TOP"     ,["White","White","Red"] );
	tester.test("FRONT"  ,"MIDDLE"  ,["White","White","Red"] );
	tester.test("FRONT"  ,"BOTTOM"  ,["White","White","Red"] );
	tester.test("RIGHT"  ,"TOP"     ,["Green","White","White"]);
	tester.test("RIGHT"  ,"MIDDLE"  ,["Green","Orange","Orange"]);
	tester.test("RIGHT"  ,"BOTTOM"  ,["Green","Orange","Orange"]);
	tester.test("BACK"   ,"TOP"     ,threeTimes("Orange"));
	tester.test("BACK"   ,"MIDDLE"  ,threeTimes("Yellow"));
	tester.test("BACK"   ,"BOTTOM"  ,threeTimes("Yellow"));
	tester.test("TOP"    ,"TOP"     ,threeTimes("Green"));
	tester.test("TOP"    ,"MIDDLE"  ,threeTimes("Green"));
	tester.test("TOP"    ,"BOTTOM"  ,["Red","Red","Yellow"]);
	tester.test("LEFT"   ,"TOP"     ,["Yellow","Yellow","Blue"]);
	tester.test("LEFT"   ,"MIDDLE"  ,["Red","Red","Blue"]);
	tester.test("LEFT"   ,"BOTTOM"  ,["Red","Red","Blue"]);
	tester.test("BOTTOM" ,"TOP"     ,["Orange","Orange","White"]);
	tester.test("BOTTOM" ,"MIDDLE"  ,threeTimes("Blue"));
	tester.test("BOTTOM" ,"BOTTOM"  ,threeTimes("Blue"));
});
test("FU\'",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	cube.rotate("Front",true);
	cube.rotate("Top",false);
	tester.test("FRONT"  ,"TOP"     ,["Red","Red","Blue"] );
	tester.test("FRONT"  ,"MIDDLE"  ,threeTimes("White") );
	tester.test("FRONT"  ,"BOTTOM"  ,threeTimes("White") );
	tester.test("RIGHT"  ,"TOP"     ,threeTimes("White"));
	tester.test("RIGHT"  ,"MIDDLE"  ,["Green","Orange","Orange"]);
	tester.test("RIGHT"  ,"BOTTOM"  ,["Green","Orange","Orange"]);
	tester.test("BACK"   ,"TOP"     ,["Green","Orange","Orange"]);
	tester.test("BACK"   ,"MIDDLE"  ,threeTimes("Yellow"));
	tester.test("BACK"   ,"BOTTOM"  ,threeTimes("Yellow"));
	tester.test("TOP"    ,"TOP"     ,["Green","Green","Red"]);
	tester.test("TOP"    ,"MIDDLE"  ,["Green","Green","Red"]);
	tester.test("TOP"    ,"BOTTOM"  ,["Green","Green","Red"]);
	tester.test("LEFT"   ,"TOP"     ,threeTimes("Yellow"));
	tester.test("LEFT"   ,"MIDDLE"  ,["Red","Red","Blue"]);
	tester.test("LEFT"   ,"BOTTOM"  ,["Red","Red","Blue"]);
	tester.test("BOTTOM" ,"TOP"     ,threeTimes("Orange"));
	tester.test("BOTTOM" ,"MIDDLE"  ,threeTimes("Blue"));
	tester.test("BOTTOM" ,"BOTTOM"  ,threeTimes("Blue"));
});
test("FU",function(){
	var cube = new Cube();
	var tester = new TripletTester(cube);
	cube.rotate("Front",true);
	cube.rotate("Top",true);
	tester.test("FRONT"  ,"TOP"     ,["Green","Orange","Orange"] );
	tester.test("FRONT"  ,"MIDDLE"  ,threeTimes("White") );
	tester.test("FRONT"  ,"BOTTOM"  ,threeTimes("White") );
	tester.test("RIGHT"  ,"TOP"     ,threeTimes("Yellow"));
	tester.test("RIGHT"  ,"MIDDLE"  ,["Green","Orange","Orange"]);
	tester.test("RIGHT"  ,"BOTTOM"  ,["Green","Orange","Orange"]);
	tester.test("BACK"   ,"TOP"     ,["Red","Red","Blue"]);
	tester.test("BACK"   ,"MIDDLE"  ,threeTimes("Yellow"));
	tester.test("BACK"   ,"BOTTOM"  ,threeTimes("Yellow"));
	tester.test("TOP"    ,"TOP"     ,["Red","Green","Green"]);
	tester.test("TOP"    ,"MIDDLE"  ,["Red","Green","Green"]);
	tester.test("TOP"    ,"BOTTOM"  ,["Red","Green","Green"]);
	tester.test("LEFT"   ,"TOP"     ,threeTimes("White"));
	tester.test("LEFT"   ,"MIDDLE"  ,["Red","Red","Blue"]);
	tester.test("LEFT"   ,"BOTTOM"  ,["Red","Red","Blue"]);
	tester.test("BOTTOM" ,"TOP"     ,threeTimes("Orange"));
	tester.test("BOTTOM" ,"MIDDLE"  ,threeTimes("Blue"));
	tester.test("BOTTOM" ,"BOTTOM"  ,threeTimes("Blue"));
});

function TripletTester(cube){
	var cube = cube;
	var FACE = {
		 FRONT  : 0
		,RIGHT  : 1
		,BACK   : 2
		,TOP    : 3
		,LEFT   : 4
		,BOTTOM : 5
	};
	var TRIPLET = {
		 TOP    : 'N'
		,BOTTOM : 'S'
		,LEFT   : 'W'
		,RIGHT  : 'E'
		,MIDDLE : 'M'
		,CENTER : 'C'
	};
	this.test = function(face, triplet, expectation){
		var f = FACE[face];
		var t = TRIPLET[triplet];
		deepEqual(
			 cube.getTriplet(f,t)
			,expectation
			,"We expect the " + face + " face's " + triplet + " triplet to be " + expectation
		);
	};
	this.fullTest = function(sideData){
		var faces = ["FRONT","RIGHT","BACK","TOP","LEFT","BOTTOM"];
		var triplets = ["TOP","MIDDLE","BOTTOM"];
		if(sideData.length != 6){ throw("sideData must be an array of size 6"); }
		for(var f=0; f<6; f++){
			var faceData = sideData[f];
			var faceName = faces[f];
			if(faceData.length != 3){ throw("faceData must be an array of size 3"); }
			for(var t=0; t<3; t++){
				this.test(faceName, triplets[t], faceData[t]);
			}
		}
	};
}

function threeTimes(item){
	return [item, item, item];
};
