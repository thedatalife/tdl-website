import 'app.css';

import WebGLApp from './webgl';
import Home from './webgl/app/home';

const webglApp = new WebGLApp(document.body, {
  debug: true
});

webglApp.playApp(new Home());
