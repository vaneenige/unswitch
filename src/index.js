const buttonMappings = ['a', 'x', 'b', 'y', 'sl', 'sr', '-', '-', 'minus', 'plus', 'lstick', 'rstick', 'home', 'screenshot', 'bumper', 'trigger'];

/**
 * Get the axes position based based on browser.
 * @param {array} axes
 * @param {array} buttons
 */
function getAxesPosition(axes, buttons) {
  if (axes.length === 10) {
    return Math.round(axes[9] / (2 / 7) + 3.5);
  }
  const [right, left, down, up] = [...buttons].reverse();
  const buttonValues = [up, right, down, left]
    .map((pressed, i) => (pressed.value ? (i * 2) : false))
    .filter(val => val !== false);
  if (buttonValues.length === 0) return 8;
  if (buttonValues.length === 2 && buttonValues[0] === 0 && buttonValues[1] === 6) return 7;
  return buttonValues.reduce((prev, curr) => prev + curr, 0) / buttonValues.length;
}

/**
 * Create an instance of Unswitch.
 * @param {object} settings
 */
function Unswitch(settings) {
  const buttonState = {};
  let axesPosition = 8;

  for (let i = 0; i < buttonMappings.length; i += 1) {
    buttonState[buttonMappings[i]] = { pressed: false };
  }

  this.update = () => {
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < Object.keys(gamepads).length; i += 1) {
      if (gamepads[i] && gamepads[i].id && gamepads[i].id.indexOf(settings.side) !== -1) {
        this.observe(gamepads[i]);
        break;
      }
    }
  };

  this.observe = (pad) => {
    const { buttons, axes } = pad;
    for (let j = 0; j < buttonMappings.length; j += 1) {
      const button = buttonMappings[j];
      if (buttonState[button].pressed !== buttons[j].pressed && settings[button]) {
        buttonState[button].pressed = buttons[j].pressed;
        settings[button](buttonState[button].pressed);
      }
    }
    if (settings.axes) {
      const position = getAxesPosition(axes, buttons);
      if (position !== axesPosition) {
        settings.axes(position);
        axesPosition = position;
      }
    }
  };
}

export default Unswitch;
