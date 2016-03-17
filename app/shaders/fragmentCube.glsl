varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

uniform vec3 lightPosition;
uniform sampler2D myMap;

// chunk(common);
// chunk(bsdfs);
// chunk(lights_pars);
// chunk(shadowmap_pars_fragment);
// chunk(shadowmask_pars_fragment);

void main(void) {

    vec4 texture = texture2D(myMap, vUv);
    vec3 lightDirection = normalize(lightPosition - vViewPosition);
    // simpliest hardcoded lighting ^^
    float c = 0.35 + max(0.0, dot(vNormal, lightDirection)) * 0.4 * getShadowMask();

    // gl_FragColor = vec4(c, c, c, 1.0);
    gl_FragColor = texture * c;
}
