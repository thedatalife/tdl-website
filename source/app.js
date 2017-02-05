// @flow

import 'app.css';

import Scenes from './scenes';
import Home from './scenes/home';

const scene = new Scenes();
scene.playScene(new Home());
