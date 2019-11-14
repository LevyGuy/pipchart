import Pip from '../pip.js';
import drawChart from './draw-chart.js';

let canvas = document.querySelector("canvas");

Pip.set(canvas,
    document.getElementById('togglePipButton'));

drawChart(canvas);
