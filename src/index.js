const buttonMappings = ['a', 'x', 'b', 'y', 'l', 'r', 'UNUSED', 'UNUSED', 'minus', 'plus', 'lstick', 'rstick', 'home', 'screenshot', 'side', 'z'];

function Unswitch(userSettings) {
  this.axisPosition = 8;
  this.buttonState = {};
  this.settings = {};
  for (let i = 0; i < buttonMappings.length; i += 1) {
    this.buttonState[buttonMappings[i]] = { pressed: false };
  }
  Object.assign(this.settings, userSettings);
  this.update = () => {
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < Object.keys(gamepads).length; i += 1) {
      if (gamepads[i] && gamepads[i].id && gamepads[i].id.indexOf(this.settings.side) !== -1) {
        this.updatePad(gamepads[i]);
        break;
      }
    }
  };

  this.updatePad = (pad) => {
    const { buttons, axes } = pad;
    for (let j = 0; j < buttonMappings.length; j += 1) {
      const button = buttonMappings[j];
      if (this.buttonState[button].pressed !== buttons[j].pressed && this.settings[button]) {
        this.buttonState[button].pressed = buttons[j].pressed;
        this.settings[button](this.buttonState[button].pressed);
      }
    }
    if (this.settings.axes) {
      const position = Math.round(axes[9] / (2 / 7) + 3.5);
      if (position !== this.axisPosition) {
        this.settings.axes(position);
        this.axisPosition = position;
      }
    }
  };
}

export default Unswitch;
