import React from "react";
import { render } from "react-dom";
import axios from "axios";


import "./index.scss";

import Root from "./Root";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://protoshark.github.io/chip8-wasm"
    : "";

render(<Root />, document.getElementById("root"));
