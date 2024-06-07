import { memo, useEffect, useRef } from "react";
import ReactDice from "react-dice-complete";
import "./styles.css";

const Dice = ({ firstDiceCount, secondDiceCount }) => {
  const reactDice = useRef(null);
  useEffect(() => {
    reactDice.current?.rollAll([firstDiceCount, secondDiceCount]);
  }, [firstDiceCount, secondDiceCount]);

  const rollDone = (totalValue, values) => {
    console.log("individual die values array:", values);
    console.log("total dice value:", totalValue);
  };

  return (
    <ReactDice
      numDice={2}
      ref={reactDice}
      rollDone={rollDone}
      disableIndividual={true}
      dieSize={100}
      margin={25}
    />
  );
};

export default memo(Dice);
