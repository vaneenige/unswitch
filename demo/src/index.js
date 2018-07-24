import Controller from '../../src/index';

const ul = document.querySelector('ul');

function logButton(control, state) {
  ul.innerHTML = `<li>${control} was ${state ? 'pressed' : 'released'}</li> ${ul.innerHTML}`;
}

function LogAxes(controller, position) {
  ul.innerHTML = `<li>${controller} ~ Axes position ${position}</li> ${ul.innerHTML}`;
}

const controllerLeft = new Controller({
  side: 'L',
  b: pressed => logButton('1 ~ B', pressed),
  a: pressed => logButton('1 ~ A', pressed),
  y: pressed => logButton('1 ~ Y', pressed),
  x: pressed => logButton('1 ~ X', pressed),
  l: pressed => logButton('1 ~ L', pressed),
  r: pressed => logButton('1 ~ R', pressed),
  axes: position => LogAxes('1', position),
});

const controllerRight = new Controller({
  side: 'R',
  b: pressed => logButton('2 ~ B', pressed),
  a: pressed => logButton('2 ~ A', pressed),
  y: pressed => logButton('2 ~ Y', pressed),
  x: pressed => logButton('2 ~ X', pressed),
  l: pressed => logButton('2 ~ L', pressed),
  r: pressed => logButton('2 ~ R', pressed),
  axes: position => LogAxes('2', position),
});

function render() {
  controllerLeft.update();
  controllerRight.update();
  requestAnimationFrame(render);
}

render();
