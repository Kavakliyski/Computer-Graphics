var vShader =
	'uniform mat4 uProjectionMatrix;'+
	'uniform mat4 uViewMatrix;'+
	'uniform mat4 uModelMatrix;'+
	'uniform bool uReflect;'+
	''+
	'attribute vec3 aXYZ;'+
	'varying vec3 vXYZ;'+
	''+
	'void main ()'+
	'{'+
	'	mat4 mvMatrix = uViewMatrix * uModelMatrix;'+
	'	vec4 pos = mvMatrix * vec4(aXYZ,1);'+
	'	if (uReflect) pos.z -= 5.0;'+
	'	vXYZ = aXYZ;'+
	'	gl_Position = uProjectionMatrix * pos;'+
	'}';
	
var fShader =
	'precision mediump float;'+
	'uniform bool uReflect;'+
	'uniform samplerCube uTexUnit;'+
	''+
	'varying vec3 vXYZ;'+
	''+
	'void main( )'+
	'{'+
	'	if (uReflect)'+
	'	{'+
	'		vec3 ray = reflect(vXYZ,vec3(0,1,0));'+
	'		gl_FragColor = 1.5*textureCube(uTexUnit,vec3(ray.x,-ray.y,ray.z))+vec4(0,0.05,0.1,0);'+
	'	}'+
	'	else'+
	'	{'+
	'		vec4 col=vec4(0.0,0.0,0.0,1.0);'+
	'		float w=0.0;'+
	'		for (float x=-2.0; x<=2.0; x++)'+
	'		for (float y=-2.0; y<=2.0; y++)'+
	'		{'+
	'			float dW = cos(x/2.0)*cos(y/2.0);'+
	'			col += dW*textureCube(uTexUnit,2.0*vXYZ+0.004*vec3(x,y,0));'+
	'			w += dW;'+
	'		}'+
	'		gl_FragColor = vec4(0.9*vec3(col)/w,1);'+
	'	}'+
	'}';
