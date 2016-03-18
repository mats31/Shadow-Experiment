#define USE_NORMALMAP;

varying vec2 vN;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vViewPosition;


uniform sampler2D map;

// chunk(normalmap_pars_fragment);

void main(void) {

  // chunk(normal_fragment);

  vec3 base = texture2D( map, vN ).rgb;
  gl_FragColor = vec4( texture2D(normalMap, vUv) * vec4(0.1, 0.1, 0.3, 1.0) );
}
