import "./App.scss";

import roms from "../utils/roms";
import RomList from "./RomList";

import Emulator from "./Emulator";
import { useSelector } from "react-redux";

const App = () => {
  const selectedRom = useSelector((store: any) => store.selectedRom);

  return (
    <div className="app">
      <Emulator rom={selectedRom} />
      <RomList roms={roms} />
    </div>
  );
};

export default App;
