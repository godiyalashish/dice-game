import { memo, useEffect, useRef } from "react";
import ReactDice from "react-dice-complete";
import "./styles.css";

const Dice = ({ firstDiceCount, secondDiceCount, rollDone }) => {
  const reactDice = useRef(null);
  useEffect(() => {
    reactDice.current?.rollAll([firstDiceCount, secondDiceCount]);
  }, [firstDiceCount, secondDiceCount]);

  return (
    <ReactDice
      numDice={2}
      ref={reactDice}
      rollDone={rollDone}
      disableIndividual={true}
      dieSize={100}
      margin={25}
      faceColor="black"
      dotColor="white"
    />
  );
};

export default memo(Dice);
