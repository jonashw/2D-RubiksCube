function RubiksControls(cube,container){
	var table = document.createElement("table");
	[    {code:"F",index:0}
		,{code:"B",index:2}
		,{code:"R",index:1}
		,{code:"L",index:3}
		,{code:"U",index:4}
		,{code:"D",index:5}
	].forEach(function(face){
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		var td_CW  = document.createElement("td");
		var td_CCW = document.createElement("td");
		var btn_CW  = document.createElement("button");
		var btn_CCW = document.createElement("button");
		tr.appendChild(th);
		tr.appendChild(td_CW);
		tr.appendChild(td_CCW);
		table.appendChild(tr);
		th.textContent = face.code;
		btn_CW.textContent = "CW";
		btn_CCW.textContent = "CCW";
		td_CW.appendChild(btn_CW);
		td_CCW.appendChild(btn_CCW);
		btn_CW.addEventListener('click',function(){
			cube.rotate(face.index, true);
		});
		btn_CCW.addEventListener('click',function(){
			cube.rotate(face.index, false);
		});
	});
	container.appendChild(table);
}
