uniform float time;

void main() {

  vec3 offset = vec3(
      sin(position.x + time) * 1.0,
      sin(position.y + time) * 1.0,
      sin(position.z + time) * 1.0
  );

  vec3 pos = position + normal * offset;

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
