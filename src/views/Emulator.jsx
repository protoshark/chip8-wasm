import React from "react";
import axios from "axios";

import "./Emulator.scss";

import {
  canvasConfig,
  SCREEN_HEIGHT,
  SCREEN_SCALE,
  SCREEN_WIDTH,
} from "../constants";

const keypad = {
  1: 0x1,
  2: 0x2,
  3: 0x3,
  4: 0xc,
  q: 0x4,
  w: 0x5,
  e: 0x6,
  r: 0xd,
  a: 0x7,
  s: 0x8,
  d: 0x9,
  f: 0xe,
  z: 0xa,
  x: 0x0,
  c: 0xb,
  v: 0xf,
};

class Emulator extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.animationFrame = 0;
    this.keypadMask = 0;
    this.cpu = null;
  }

  async start() {
    cancelAnimationFrame(this.animationFrame);

    // the selected rom should be a valid rom
    if (this.props.rom.id < 0) {
      return;
    }

    console.log(`Starting ${this.props.rom.name}`);

    const res = await axios.get(this.props.rom.uri, {
      responseType: "arraybuffer",
    });
    const romBuffer = new Uint8Array(res.data);

    let chip8 = await import("chip8");
    this.cpu = chip8.CHIP8.new(romBuffer);

    this.canvasRef.current.addEventListener(
      "keydown",
      this.onKeyPress(this.cpu, this.keypadMask)
    );

    let then = Date.now();
    const loop = () => {
      if (Date.now() - then >= 1000 / 60) {
        for (let i = 0; i < 500; i++) {
          this.cpu.run_cycle();
        }

        this.cpu.set_keypad(0);

        this.cpu.decrement_timers();

        this.cpu.set_keypad(this.keypadMask);

        let context = this.canvasRef.current.getContext("2d");

        context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        for (let i = 0; i < 64 * 32; i++) {
          const x = i % 64;
          const y = Math.floor(i / 64);

          if (this.cpu.get_vram(i) === 1) {
            context.fillRect(x, y, 1, 1);
          }
        }

        then = Date.now();
      }

      this.animationFrame = requestAnimationFrame(loop);
    };

    this.animationFrame = requestAnimationFrame(loop);
  }

  onKeyPress(cpu, keypadMask) {
    return (event) => {
      const key = keypad[event.key];
      if (cpu && key) {
        const status = cpu.status();
        if (status >= 0) {
          cpu.set_register(status, key);
          cpu.set_running();
        }
        keypadMask |= 1 << key;
      }
    };
    // console.log(`sending key `);
  }

  resetCanvas() {
    const context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasConfig.width, canvasConfig.height);
    context.fillStyle = canvasConfig.foregroundColor;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (!canvas) throw new Error("Could not find the canvas");

    canvas.width = SCREEN_WIDTH * SCREEN_SCALE;
    canvas.height = SCREEN_HEIGHT * SCREEN_SCALE;

    canvas.style.background = canvasConfig.backgroundColor;

    const context = canvas.getContext("2d");

    if (!context) throw new Error("Could not get the canvas context");

    context.fillStyle = canvasConfig.foregroundColor;
    context.scale(SCREEN_SCALE, SCREEN_SCALE);
  }

  componentDidUpdate() {
    this.canvasRef.current.removeEventListener("keydown", this.onKeyPress);
    this.resetCanvas();
    this.start();
  }

  render() {
    return (
      <canvas
        width="512"
        height="256"
        ref={this.canvasRef}
        tabIndex="1"
      ></canvas>
    );
  }
}

export default Emulator;
