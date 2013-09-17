test("isSolved() (no moves)",function(){
	var cube = new RubiksCube();
	equal(cube.isSolved(), true, 'An un-manipulated cube is solved');
});
test("isSolved() (one move)",function(){
	var cube = new RubiksCube();
	cube.rotate(1,true);
	equal(cube.isSolved(), false, 'An manipulated (1-move) cube is NOT solved');
});
test("isSolved() (two moves that cancel)",function(){
	var cube = new RubiksCube();
	cube.rotate(1,true);
	cube.rotate(1,false);
	equal(cube.isSolved(), true, 'An manipulated (2 opposite moves) cube is solved');
});
