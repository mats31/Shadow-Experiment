float M_PI = 3.1415926535897932384626433832795;

uniform float time;
uniform float up;
uniform float wind;

attribute float radius;
attribute vec3 customColor;
attribute float size;
attribute float velocity;

void main() {

  float customSize = size + 10.0;

  // vec3 newPosition = vec3(
  //   position.x + cos(time * customTime) * velocity * ( 35.0 * M_PI ) + sin(time * customTime) * velocity * ( 50.0 * M_PI ),
  //   position.y + cos(time * customTime) * velocity * ( 35.0 * M_PI ) + cos(time * customTime) * velocity * ( 50.0 * M_PI ),
  //   position.z
  // );
  vec3 newPosition = vec3(
    position.x + ( position.x - position.x + cos(time * velocity / 10.0 + 30.0) * (M_PI + radius) + sin(time * velocity / 10.0) * (M_PI + radius) * wind ) * 0.9,
    position.y + ( position.y - position.y + up * velocity * 0.05 * wind ) * 0.9,
    position.z + ( position.z - position.z + cos(time * velocity / 10.0) * (M_PI + radius) + cos(time * velocity / 10.0) * (M_PI + radius) * wind ) * 0.9
  );

  vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );

  gl_PointSize = customSize * ( 50.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}
