#define USE_NORMALMAP;

uniform vec3 diffuse;
uniform float shininess;
uniform vec3 specular;
uniform float noise;
uniform float normalRepeat;
uniform float normalScale;
uniform float opacity;
uniform float rimPower;
uniform sampler2D map;
uniform sampler2D normalMap;

varying vec2 vN;
varying vec2 vUv;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vEye;
varying mat3 tbn;

// _chunk(common);
// _chunk(bsdfs);
// _chunk(lights_pars);
// _chunk(lights_phong_pars_fragment);
// _chunk(normalmap_pars_fragment);

float random(vec3 scale,float seed){
  return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
}

void main(void) {
  // vec4 diffuseColor = vec4( diffuse, opacity );
  // ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  // vec3 totalEmissiveRadiance = emissive;

  // _chunk(normal_fragment);
  // _chunk(specularmap_fragment);
  // _chunk(lights_phong_fragment);
  // _chunk(lights_template);

  vec3 finalNormal = vNormal;
	vec2 calculatedNormal = vN;

	vec3 normalTex = texture2D( normalMap, vUv * normalRepeat ).xyz * 2.0 - 1.0;
	normalTex.xy *= normalScale;
	normalTex.y *= -1.;
	normalTex = normalize( normalTex );
	mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );
	finalNormal = tsb * normalTex;

	vec3 r = reflect( vViewPosition, normalize( finalNormal ) );
	float m = 2.0 * sqrt( r.x * r.x + r.y * r.y + ( r.z + 1.0 ) * ( r.z + 1.0 ) );
	calculatedNormal = vec2( r.x / m + 0.5,  r.y / m + 0.5 );

  vec3 base = texture2D( map, calculatedNormal ).rgb;

  // rim lighting
  //float f = rimPower * abs( dot( vNormal, normalize( vEye ) ) );
  //f = 0.5 * ( 1. - smoothstep( 0.0, 1., f ) );
  //base += vec3( f );

  // screen blending
  //base = vec3( 1. ) - ( vec3( 1. ) - base ) * ( vec3( 1. ) - base );
  // noise
  //base += noise * ( .5 - random( vec3( 1. ), length( gl_FragCoord ) ) );

  gl_FragColor = vec4( base, 1. );
}
