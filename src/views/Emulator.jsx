import React from "react";
import axios from "axios";

import "./Emulator.scss";

import {
  canvasConfig,
  SCREEN_HEIGHT,
  SCREEN_SCALE,
  SCREEN_WIDTH,
} from "../constants";
import selectedRom from "../redux/reducers/rom";

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
    this.canvasWrapperRef = React.createRef();

    this.animationFrame = 0;
    this.keypadMask = 0;
    this.cpu = null;
  }

  async start() {
    cancelAnimationFrame(this.animationFrame);
    if (!this.props.rom) return;

    console.log(`Starting ${this.props.rom.name}`);

    const res = await axios.get(this.props.rom.uri, {
      responseType: "arraybuffer",
    });
    const romBuffer = new Uint8Array(res.data);

    let chip8 = await import("chip8");
    this.cpu = chip8.CHIP8.new(romBuffer);

    document.addEventListener(
      "keydown",
      this.onKeyPress(this.cpu)
    );

    let then = Date.now();
    // Pong needs to run a little bit slower
    const cyclesPerFrame = this.props.rom.name === "Pong" ? 20 : 100

    const loop = () => {
      if (Date.now() - then >= 1000 / 60) {
        for (let i = 0; i < cyclesPerFrame; i++) {
          this.cpu.run_cycle();
        }

        this.keypadMask = 0;
        this.cpu.set_keypad(0);

        this.cpu.decrement_timers();

        let context = this.canvasRef.current.getContext("2d");

        context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        for (let i = 0; i < 64 * 32; i++) {
          const x = i % 64;
          const y = Math.floor(i / 64);

          if (this.cpu.get_vram(i) === 1) {
            context.fillRect(x, y, 1, 1);
          }
        }
        context.stroke();

        then = Date.now();
      }

      this.animationFrame = requestAnimationFrame(loop);
    };

    this.animationFrame = requestAnimationFrame(loop);
  }

  onKeyPress(cpu) {
    return (event) => {
      const key = keypad[event.key];
      if (cpu && key !== undefined) {
        const status = cpu.status();
        if (status >= 0) {
          cpu.set_register(status, key);
          cpu.set_running();
        }
        this.keypadMask |= 1 << key;
        this.cpu.set_keypad(this.keypadMask);
      }
    };
  }

  resetCanvas() {
    const context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasConfig.width, canvasConfig.height);
    context.fillStyle = canvasConfig.foregroundColor;

    context.strokeStyle = "#31363b";
    context.lineWidth = 0.05;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;

    canvas.width = SCREEN_WIDTH * SCREEN_SCALE;
    canvas.height = SCREEN_HEIGHT * SCREEN_SCALE;

    canvas.style.background = canvasConfig.backgroundColor;

    const context = canvas.getContext("2d");

    context.fillStyle = canvasConfig.foregroundColor;
    context.scale(SCREEN_SCALE, SCREEN_SCALE);
  }

  componentDidUpdate() {
    document.removeEventListener("keydown", this.onKeyPress);
    this.resetCanvas();
    this.start();
  }

  render() {
    return (
      <div ref={this.canvasWrapperRef} className="canvas-wrapper">
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }
}

export default Emulator;
