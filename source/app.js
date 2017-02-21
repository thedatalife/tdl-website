import 'app.css';

import WebGLApp from './webgl';
import Home from './webgl/scene/home';
import Test from './webgl/scene/test';

const webglApp = new WebGLApp(document.body, {
  debug: true
});

webglApp.playApp(new Test());
