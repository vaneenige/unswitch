import Unswitch from '../../src/index';

const ul = document.querySelector('ul');

function lb(side, control, state) {
  ul.innerHTML = `<li>${side} ${control} was ${state ? 'pressed' : 'released'}</li> ${ul.innerHTML}`;
}

function la(controller, position) {
  ul.innerHTML = `<li>${controller} ~ Axes position ${position}</li> ${ul.innerHTML}`;
}

function createController(s) {
  const controller = new Unswitch({
    side: s,
    b: p => lb(s, ' ~ B', p),
    a: p => lb(s, ' ~ A', p),
    y: p => lb(s, ' ~ Y', p),
    x: p => lb(s, ' ~ X', p),
    sl: p => lb(s, ' ~ SL', p),
    sr: p => lb(s, ' ~ SR', p),
    minus: p => lb(s, ' ~ Minus ', p),
    plus: p => lb(s, ' ~ Plus', p),
    lstick: p => lb(s, ' ~ Lstick', p),
    rstick: p => lb(s, ' ~ Rstick', p),
    home: p => lb(s, ' ~ Home', p),
    screenshot: p => lb(s, ' ~ Screenshot', p),
    bumper: p => lb(s, ' ~ Bumper', p), // L or R
    trigger: p => lb(s, ' ~ Trigger', p), // ZL or ZR
    axes: p => la(s, p),
  });
  return controller;
}

const controllerLeft = createController('L');
const controllerRight = createController('R');

function render() {
  controllerLeft.update();
  controllerRight.update();
  requestAnimationFrame(render);
}

render();
