import Webgl from './Webgl';
import Webgl1 from './xp/01/Webgl';
import Webgl2 from './xp/02/Webgl';
import Webgl3 from './xp/03/Webgl';
import Webgl4 from './xp/04/Webgl';
import Webgl5 from './xp/05/Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let projectGui;
let gui;

const projects = {
  first: false,
  second: false,
  third: false,
  fourth: false,
  fifth: false,
  sixth: true,
};

function killExperience() {
  document.body.removeChild( webgl.renderer.domElement );
  webgl = null;
  for ( let i = 0; i < document.querySelectorAll( '.dg.main.a' ).length; i++) {
    const item = document.querySelectorAll( '.dg.main.a' )[i];
    if ( i > 0 ) {
      item.parentElement.removeChild( item );
    }
  }
}

function launchExperience( id ) {
  switch ( id ) {
    case 0:
      webgl = new Webgl( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    case 1:
      webgl = new Webgl1( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    case 2:
      webgl = new Webgl2( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    case 3:
      webgl = new Webgl3( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    case 4:
      webgl = new Webgl4( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    case 5:
      webgl = new Webgl5( window.innerWidth, window.innerHeight );
      document.body.appendChild( webgl.renderer.domElement );
      break;
    default:
      killExperience();
  }
}

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

function animate() {
  raf( animate );

  if ( webgl !== null ) {
    webgl.render();
  }
}

// webgl settings
let i = 0;
for ( const key of Object.keys( projects ) ) {
  if ( projects[key]) {
    launchExperience( i );
    break;
  }
  i++;
}

// Project GUI settings
projectGui = new dat.GUI();
projectGui.add( projects, 'first' ).listen().onChange( ( newValue ) => {
  projects.first = true;
  projects.second = false;
  projects.third = false;
  projects.fourth = false;
  projects.fifth = false;
  projects.sixth = false;
  killExperience();
  launchExperience( 0 );
});
projectGui.add( projects, 'second' ).listen().onChange( ( newValue ) => {
  projects.first = false;
  projects.second = true;
  projects.third = false;
  projects.fourth = false;
  projects.fifth = false;
  projects.sixth = false;
  killExperience();
  launchExperience( 1 );
});
projectGui.add( projects, 'third' ).listen().onChange( ( newValue ) => {
  projects.first = false;
  projects.second = false;
  projects.third = true;
  projects.fourth = false;
  projects.fifth = false;
  projects.sixth = false;
  killExperience();
  launchExperience( 2 );
});
projectGui.add( projects, 'fourth' ).listen().onChange( ( newValue ) => {
  projects.first = false;
  projects.second = false;
  projects.third = false;
  projects.fourth = true;
  projects.fifth = false;
  projects.sixth = false;
  killExperience();
  launchExperience( 3 );
});
projectGui.add( projects, 'fifth' ).listen().onChange( ( newValue ) => {
  projects.first = false;
  projects.second = false;
  projects.third = false;
  projects.fourth = false;
  projects.fifth = true;
  projects.sixth = false;
  killExperience();
  launchExperience( 4 );
});
projectGui.add( projects, 'sixth' ).listen().onChange( ( newValue ) => {
  projects.first = false;
  projects.second = false;
  projects.third = false;
  projects.fourth = false;
  projects.fifth = false;
  projects.sixth = true;
  killExperience();
  launchExperience( 5 );
});
// handle resize
window.addEventListener( 'resize', resizeHandler );

// let's play !
animate();
