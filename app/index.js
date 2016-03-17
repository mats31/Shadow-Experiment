import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let projectGui;
let gui;

const projects = {
  first: true,
  second: false,
}

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.renderer.domElement);

// Project GUI settings
projectGui = new dat.GUI();
projectGui.add( projects, 'first' );
// GUI settings
gui = new dat.GUI();
gui.add(webgl.point.uniforms.wind, 'value' ).min(0.1).max(1.0);

// handle resize
window.addEventListener('resize', resizeHandler);

// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  webgl.render();
}
