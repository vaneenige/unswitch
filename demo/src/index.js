import Controller from '../../src/index';

const ul = document.querySelector('ul');

function logButton(control, state) {
  ul.innerHTML = `<li>${control} was ${state ? 'pressed' : 'released'}</li> ${ul.innerHTML}`;
}

function LogAxes(position) {
  ul.innerHTML = `<li>Axes position ${position}</li> ${ul.innerHTML}`;
}

const controller = new Controller({
  b: pressed => logButton('B', pressed),
  a: pressed => logButton('A', pressed),
  y: pressed => logButton('Y', pressed),
  x: pressed => logButton('X', pressed),
  l: pressed => logButton('L', pressed),
  r: pressed => logButton('R', pressed),
  axes: position => LogAxes(position),
});

function render() {
  controller.update();
  requestAnimationFrame(render);
}

render();
