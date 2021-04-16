import { SET_ROM } from "../actions";
import { Rom } from "../../utils/roms";

export interface selectRomAction {
  type: string;
  payload: { rom: Rom };
}

const selectedRom = (state = null, action: selectRomAction) => {
  switch (action.type) {
    case SET_ROM:
      return action.payload.rom;
    default:
      return state;
  }
};
export default selectedRom;
