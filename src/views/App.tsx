import "./App.scss";

import roms from "../utils/roms";
import RomList from "./RomList";

import Emulator from "./Emulator";
import { useSelector } from "react-redux";

const App = () => {
  const selectedRom = useSelector((store: any) => store.selectedRom);

  return (
    <div className="app">
      <div className="logo">
        <h1>CHIP-8</h1>
      </div>
      <main className="container">
        <section className="roms content-center">
          <RomList roms={roms} />
        </section>
        <section className="emulator content-center">
          <Emulator rom={selectedRom} />
        </section>
      </main>
    </div>
  );
};

export default App;
