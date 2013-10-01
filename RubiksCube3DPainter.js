function RubiksCube3DPainter(cube){
	//the following will rotate the front-bottom triplet ... to where???  This is how I will drive my visualization
	//cube.tiles[0][2].forEach(function(t){ console.log(t.plane); rotateAroundWorldAxis(t.plane, new THREE.Matrix3(1,0,0), Math.PI / 2); })
	//the following rotate the front-bottom-left triplet in place.. when it should be rotating about 0,0,0
	//var p = painter.planes[0]; var g = p.geometry; g.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 3 * g.height ) ); p.rotateY(5)
	var center = new THREE.Matrix3(0,0,0);
	renderer = new THREE.WebGLRenderer();
	var c = 995 / 1000;
	renderer.setSize( c * window.innerWidth, c * window.innerHeight );
	document.body.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	scene = new THREE.Scene();
	scene.add(camera);
	var planes = [];
	this.planes = planes;

	camera.position.y = 0;
	camera.position.z = 600;
	camera.position.y = -100;
	var cameraOrbiter = new Orbiter(camera.position, 200, ['x','y'], [1,0.6]);
	var transforms = [
		 { primaryAxis: 'x', secondaryAxis: 'y', rotateAxis: 'y', rotate: 0   ,offsetAxis: 'z', offset:  1}
		,{ primaryAxis: 'z', secondaryAxis: 'y', rotateAxis: 'y', rotate: 90  ,offsetAxis: 'x', offset:  1}
		,{ primaryAxis: 'x', secondaryAxis: 'y', rotateAxis: 'y', rotate: 180 ,offsetAxis: 'z', offset: -1}
		,{ primaryAxis: 'z', secondaryAxis: 'y', rotateAxis: 'y', rotate: 270 ,offsetAxis: 'x', offset: -1}
		,{ primaryAxis: 'x', secondaryAxis: 'z', rotateAxis: 'x', rotate: 270 ,offsetAxis: 'y', offset:  1}
		,{ primaryAxis: 'x', secondaryAxis: 'z', rotateAxis: 'x', rotate: 90  ,offsetAxis: 'y', offset: -1}
	];
	var sideLength = 50;
	var checkerboard = true;
	cube.faces.forEach(function(face,f){
		var transform = transforms[f];
		face.forEach(function(triplet,t){
			triplet.forEach(function(tile,i){
				if(checkerboard){ COLOR_NAMES.reverse(); }
				var color = COLORS[COLOR_NAMES[f]];
				var plane = new THREE.Mesh(new THREE.PlaneGeometry(sideLength, sideLength), new THREE.MeshLambertMaterial({color: color}));
				plane.position[transform.primaryAxis]   = sideLength * (i - 1);
				plane.position[transform.secondaryAxis] = sideLength * (t - 1);
				plane.position[transform.offsetAxis] += (transform.offset * 1.5 * sideLength);
				plane.rotation[transform.rotateAxis] = transform.rotate * Math.PI / 180;
				cube.faces[f][t][i].plane = plane;
				scene.add(plane);
				planes.push(plane);
			});
		});
	});

	//add some light!
		[
			 [   0, 0, 300, 1.2]//front
			,[ 300, 0,   0, 1.2]//right
			,[-300, 0,   0, 1.2]//left
			,[   0, 300, 0,   1]//top
			,[   0,-300, 0,   1]//bottom
		].forEach(function(lightParams){
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.x = lightParams[0];
			light.position.y = lightParams[1];
			light.position.z = lightParams[2];
			light.intensity  = lightParams[3];
			light.castShadow = true;
			scene.add(light);
		});
 
	function animate(){
		cameraOrbiter.next();
		//camera.lookAt(center);
		renderer.render(scene, camera);
        requestAnimationFrame(function(){
            animate();
        });
	}
	animate();
}
var COLOR_NAMES = ["WHITE","ORANGE","YELLOW","RED","GREEN","BLUE"];
var COLORS = {
	 RED:    0xff3333
	,ORANGE: 0xeeaa33
	,YELLOW: 0xddee33
	,GREEN:  0x339933
	,BLUE:   0x3333ff
	,WHITE:  0xe0e0e0
};
function rotateAroundWorldAxis( object, axis, radians ) {
	var rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationAxis( axis.getNormalMatrix(axis), radians );
	rotationMatrix.multiply( object.matrix );                       // pre-multiply
	object.matrix = rotationMatrix;
	object.rotation.setFromRotationMatrix( object.matrix );
}
function orbitCoords(theta, radius){
	return {x: radius * Math.cos(theta), y: radius * Math.sin(theta)};
}
function Orbiter(position, radius, components, coefficients){
	var radius = radius;
	var position = position;
	var theta = 0;
	var components = components || ['x','y'];
	var coefficients = coefficients || [1,1];
	var rad;
	this.next = function(){
		theta = (theta > 360 ? (theta - 360) : theta) + 1;
		rad = theta * Math.PI / 180;
		position[components[0]] = coefficients[0] * radius * Math.cos(rad);
		position[components[1]] = coefficients[1] * radius * Math.sin(rad);
	};
}
