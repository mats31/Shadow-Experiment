varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

uniform float time;

// chunk(shadowmap_pars_vertex);

void main() {

  vUv = uv;

    // adding some displacement based on the vertex position
    vec3 offset = vec3(
        sin(position.x + time) * 1.0,
        sin(position.y + time) * 1.0,
        sin(position.z + time) * 1.0
    );

    vec3 pos = position + normal * offset * 20.0;

    // just add some noise to the normal
    vNormal = normalMatrix * vec3(normal + normalize(offset) * 2.2);

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

    // store the world position as varying for lighting
    vViewPosition = worldPosition.xyz;
    // chunk(shadowmap_vertex);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
