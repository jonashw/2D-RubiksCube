function RubiksKeyboardControls(cube){
	[
		 {code: 'F', index: 0, keyCodeCW: 107, keyCodeCCW:75}
		,{code: 'B', index: 2, keyCodeCW: 59,  keyCodeCCW:58}
		,{code: 'R', index: 1, keyCodeCW: 108, keyCodeCCW:76}
		,{code: 'L', index: 3, keyCodeCW: 106, keyCodeCCW:74}
		,{code: 'U', index: 4, keyCodeCW: 105, keyCodeCCW:73}
		,{code: 'D', index: 5, keyCodeCW: 44,  keyCodeCCW:60}
	].forEach(function(mapping){
		document.addEventListener('keypress',function(e){
			switch(e.keyCode){
				case mapping.keyCodeCW:
					cube.rotate(mapping.index,true);
					//console.log('movement by keyboard: ' + mapping.code);
					break;
				case mapping.keyCodeCCW:
					cube.rotate(mapping.index,false);
					//console.log('movement by keyboard: ' + mapping.code + '\'');
					break;
			}
		});
	});
	document.addEventListener('keypress',function(e){
		switch(e.keyCode){
			case 115://s
				cube.scramble();
				break;
			case 114://r
				cube.reset();
				break;
		}
	});
}
