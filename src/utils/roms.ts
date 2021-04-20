export interface Rom {
  id: Number;
  name: string;
  uri: string;
  instructions?: Instruction[];
}

export interface Instruction {
  key: string;
  action: string;
}

const roms: Rom[] = [
  {
    id: 0,
    name: "Tic-Tac-Toe",
    uri: "/roms/TICTACTOE",
    instructions: [
      { key: "1", action: "Select the first square" },
      { key: "2", action: "Select the second square" },
      { key: "3", action: "Select the third square" },
      { key: "q", action: "Select the fourth square" },
      { key: "w", action: "Select the fifth square" },
      { key: "e", action: "Select the sixth square" },
      { key: "a", action: "Select the seventh square" },
      { key: "s", action: "Select the eighth square" },
      { key: "d", action: "Select the ninth square" },
    ],
  },
  { id: 1, name: "Maze", uri: "/roms/MAZE" },
  { id: 2, name: "Life", uri: "/roms/LIFE" },
  {
    id: 3,
    name: "Tetris",
    uri: "/roms/TETRIS",
    instructions: [
      { key: "q", action: "Rotate piece" },
      { key: "w", action: "Go left" },
      { key: "e", action: "Go right" },
      { key: "a", action: "Fall faster" },
    ],
  },
  { id: 4, name: "Tank", uri: "/roms/TANK" },
  { id: 5, name: "Tron", uri: "/roms/TRON" },
  { id: 6, name: "Pong", uri: "/roms/PONG" },
  { id: 7, name: "Brix", uri: "/roms/BRIX" },
  { id: 8, name: "Kaleid", uri: "/roms/KALEID" },
  { id: 9, name: "Merlin", uri: "/roms/MERLIN" },
  {
    id: 12,
    name: "Hidden",
    uri: "/roms/HIDDEN",
    instructions: [
      { key: "2", action: "Go up" },
      { key: "q", action: "Go left" },
      { key: "w", action: "Choose card" },
      { key: "e", action: "Go right" },
      { key: "s", action: "Go down" },
    ],
  },
  {
    id: 14,
    name: "Puzzle",
    uri: "/roms/PUZZLE",
    instructions: [
      { key: "2", action: "Go up" },
      { key: "q", action: "Go left" },
      { key: "e", action: "Go right" },
      { key: "s", action: "Go down" },
    ],
  },
  { id: 15, name: "UFO", uri: "/roms/UFO" },
];

export default roms;
