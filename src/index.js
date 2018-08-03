const m = ['b', 'a', 'y', 'x', 'l', 'r'];

function Unswitch(s) {
  this.a = 8;
  this.b = {};
  this.c = {};
  for (let i = 0; i < m.length; i += 1) {
    this.b[m[i]] = { p: false };
  }
  Object.assign(this.c, s);
  this.update = () => {
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < Object.keys(gamepads).length; i += 1) {
      if (gamepads[i] && gamepads[i].id && gamepads[i].id.indexOf(this.c.side) !== -1) {
        const pad = gamepads[i];
        const { buttons, axes } = pad;
        for (let j = 0; j < m.length; j += 1) {
          const button = m[j];
          if (this.b[button].p !== buttons[j].pressed && this.c[button]) {
            this.b[button].p = buttons[j].pressed;
            this.c[button](this.b[button].p);
          }
        }
        if (this.c.axes) {
          const position = Math.round(axes[9] / (2 / 7) + 3.5);
          if (position !== this.a) {
            this.c.axes(position);
            this.a = position;
          }
        }
        break;
      }
    }
  };
}

export default Unswitch;
