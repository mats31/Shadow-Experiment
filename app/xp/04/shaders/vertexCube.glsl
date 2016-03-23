varying vec2 vN;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

uniform sampler2D normalMap;

void main() {

  vec4 p = vec4( position, 1. );

  vec3 e = normalize( vec3( modelViewMatrix * p ) );
  vec3 n = normalize( normalMatrix * normal );
  vNormal = normalMatrix * normal;

  vec3 r = reflect( e, n );
  float m = 2. * sqrt(
      pow( r.x, 2. ) +
      pow( r.y, 2. ) +
      pow( r.z + 1., 2. )
  );
  vN = r.xy / m + .5;

  vUv = uv;

  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vViewPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * p;
}
