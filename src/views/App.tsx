import { useSelector } from "react-redux";

import "./App.scss";

import roms, { Rom } from "../utils/roms";

import Emulator from "./Emulator";
import RomList from "./RomList";
import Instructions from "./Instructions";

const App = () => {
  const selectedRom: Rom | null = useSelector(
    (store: any) => store.selectedRom
  );

  return (
    <div className="app">
      <div className="logo">
        <h1>CHIP-8</h1>
      </div>
      <main className="container">
        <section className="roms">
          <RomList roms={roms} />
        </section>
        <section className="emulator">
          <Emulator rom={selectedRom} />
        </section>
        <section className="instructionList">
          <Instructions instructions={selectedRom && selectedRom.instructions} />
        </section>
      </main>
    </div>
  );
};

export default App;
