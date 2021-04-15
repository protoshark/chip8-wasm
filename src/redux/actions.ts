import { Rom } from "../utils/roms";

export const SET_ROM = "SET_ROM";
export const GET_ROM = "GET_ROM";

export const setRom = (rom: Rom) => ({
  type: SET_ROM,
  payload: rom,
});
