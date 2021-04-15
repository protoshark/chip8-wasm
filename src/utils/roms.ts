export interface Rom {
  id: Number;
  name: string;
  uri: string;
}

const roms: Rom[] = [
  { id: 0, name: "Tic-Tac-Toe", uri: "/roms/TICTACTOE" },
  { id: 1, name: "Maze", uri: "/roms/MAZE" },
];

export default roms;
