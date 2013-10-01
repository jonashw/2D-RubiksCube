function PlaneOrbit(obj,center,rotationAxis){
	this.obj = obj;
	this.cfg = PlaneOrbit.CONFIG[rotationAxis];
	this.radius = obj.position.distanceTo(center);
	this.orbitInterceptDueToPosition = THREE.Math.radToDeg(Math.asin(obj.position[this.cfg.positionAxisB] / this.radius));
	this.orbitProgress = 0;
}
PlaneOrbit.prototype.rotate = function(deg,clockwise){
	this.orbitProgress = (clockwise ? (this.orbitProgress + deg) : (this.orbitProgress - deg)) % 360;
	var rotationRadians = THREE.Math.degToRad((clockwise ? 1 : -1) * deg);
	rotateAroundWorldAxis(this.obj, this.cfg.rotationAxisVector, rotationRadians);
	var orbitRadians = THREE.Math.degToRad(this.orbitProgress + this.orbitInterceptDueToPosition);
	this.obj.position[this.cfg.positionAxisA] = this.radius * Math.cos(orbitRadians);
	this.obj.position[this.cfg.positionAxisB] = this.radius * Math.sin(orbitRadians);
};
PlaneOrbit.CONFIG = {
	 'x': {positionAxisA:'y',positionAxisB:'z', rotationAxisVector: new THREE.Vector3(1,0,0)}
	,'y': {positionAxisA:'z',positionAxisB:'x', rotationAxisVector: new THREE.Vector3(0,1,0)}
	,'z': {positionAxisA:'y',positionAxisB:'x', rotationAxisVector: new THREE.Vector3(0,0,-1)}
};
