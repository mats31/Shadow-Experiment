#define USE_NORMALMAP;

varying vec2 vN;
varying vec2 vUv;


varying mat3 tbn;


uniform vec3 diffuse;
uniform float shininess;
uniform vec3 specular;

uniform float opacity;

uniform sampler2D map;


// chunk(common);
// chunk(bsdfs);
// chunk(lights_pars);
// chunk(lights_phong_pars_fragment);
// chunk(normalmap_pars_fragment);

void main(void) {
  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  // vec3 totalEmissiveRadiance = emissive;

  // chunk(normal_fragment);
  // chunk(specularmap_fragment);
  // chunk(lights_phong_fragment);
  // chunk(lights_template);

  vec3 base = texture2D( map, vN ).rgb;
  gl_FragColor = vec4( base, 1. );
}
