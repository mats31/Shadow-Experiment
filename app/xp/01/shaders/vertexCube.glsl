varying vec2 vN;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;
varying mat3 tbn;

uniform sampler2D normalMap;

attribute vec4 tangent;

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

  // Create the Tangent-Binormal-Normal Matrix used for transforming
  // coordinates from object space to tangent space
  vec3 vNormal = normalize(normalMatrix * normal);
  vec3 vTangent = normalize( normalMatrix * tangent.xyz );
  vec3 vBinormal = normalize(cross( vNormal, vTangent ) * tangent.w);
  tbn = mat3(vTangent, vBinormal, vNormal);

  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vViewPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * p;
}
