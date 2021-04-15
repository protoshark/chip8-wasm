import { AnyAction } from "redux";

import { SET_ROM } from "../actions";
import { Rom } from "../../utils/roms";

const initialState: Rom = { id: -1, name: "", uri: "" };

const selectedRom = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_ROM:
      return {
        ...state,
        ...action.payload.rom,
      };
    default:
      return state;
  }
};
export default selectedRom;
