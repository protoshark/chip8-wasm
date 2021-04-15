const path = require("path");

const {
  override,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = override(
  addWebpackModuleRule({ test: /\.wasm$/ }),
  addWebpackPlugin(
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./chip8"),
      outDir: path.resolve(__dirname, "wasm-build"),
    })
  )
);
