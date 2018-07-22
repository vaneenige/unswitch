const m = ['b', 'a', 'y', 'x', 'l', 'r'];

class Unswitch {
  constructor(s) {
    this.a = 8;
    this.b = {};
    this.c = {};
    for (let i = 0; i < m.length; i += 1) {
      this.b[m[i]] = { p: false };
    }
    Object.assign(this.c, s);
  }

  update() {
    const pad = navigator.getGamepads()[0];
    if (pad === null) return;
    const { buttons, axes } = pad;
    for (let i = 0; i < m.length; i += 1) {
      const button = m[i];
      if (this.b[button].p !== buttons[i].pressed && this.c[button]) {
        this.b[button].p = buttons[i].pressed;
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
  }
}

export default Unswitch;
