attribute vec4 tangent;

uniform vec2 repeat;
uniform sampler2D normalMap;

varying vec2 vN;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vEye;
varying vec3 vViewPosition;

void main() {

  vec4 p = vec4( position, 1. );

  vec3 e = normalize( vec3( modelViewMatrix * p ) );
  vec3 n = normalize( normalMatrix * normal );

  vec3 r = reflect( e, n );
  float m = 2. * sqrt(
      pow( r.x, 2. ) +
      pow( r.y, 2. ) +
      pow( r.z + 1., 2. )
  );
  vN = r.xy / m + .5;

  vUv = repeat * uv;
  vNormal = normalize( normalMatrix * normal );
  vTangent = normalize( normalMatrix * tangent.xyz );
  vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );
  vViewPosition = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );
  vEye = ( modelViewMatrix * vec4( position, 1.0 ) ).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * p;
}
