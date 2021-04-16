import { useMemo } from "react";

import "./Instructions.scss";

import { Instruction } from "../utils/roms";

interface InstructionProps {
  instructions: Instruction[] | null | undefined;
}

const Instructions = ({ instructions }: InstructionProps) => {
  const instructionList = useMemo(() => instructions, [instructions]);

  return instructionList ? (
    <div className="instructions">
      <h1>Instructions</h1>
      <div className="inlist">
        {instructionList.map((instruction) => {
          return (
            <p className="instruction" key={`ch-keypad-${instruction.key}`}>
              <span className="key">{instruction.key}</span>
              <span className="action">{instruction.action}</span>
            </p>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Instructions;
