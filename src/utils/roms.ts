export interface Rom {
  id: Number;
  name: string;
  uri: string;
}

const roms: Rom[] = [
  { id: 0, name: "Tic-Tac-Toe", uri: "/roms/TICTACTOE" },
  { id: 1, name: "Maze", uri: "/roms/MAZE" },
  { id: 2, name: "Life", uri: "/roms/LIFE" },
  { id: 3, name: "Tetris", uri: "/roms/TETRIS" },
  { id: 4, name: "Tank", uri: "/roms/TANK" },
  { id: 5, name: "Tron", uri: "/roms/TRON" },
  { id: 6, name: "Pong", uri: "/roms/PONG" },
  { id: 7, name: "Brix", uri: "/roms/BRIX" },
  { id: 8, name: "Kaleid", uri: "/roms/KALEID" },
  { id: 9, name: "Merlin", uri: "/roms/MERLIN" },
  { id: 10, name: "Vers", uri: "/roms/VERS" },
  { id: 11, name: "Guess", uri: "/roms/GUESS" },
  { id: 12, name: "Hidden", uri: "/roms/HIDDEN" },
  { id: 13, name: "Invaders", uri: "/roms/INVADERS" },
  { id: 14, name: "Puzzle", uri: "/roms/PUZZLE" },
  { id: 15, name: "UFO", uri: "/roms/UFO" },
];

export default roms;
