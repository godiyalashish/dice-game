import { Box, Button, Typography } from "@mui/material";
import Dice from "../../components/Dice";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import SelectBet from "../../components/SelectBet";
import { playBet } from "../../services/playBet";
import { AppDataContext } from "../../utils/AppDataContext";
import { UserContext } from "../../utils/userContext";
import Confetti from "react-confetti";
import rollSound from "../../assets/rolling-dice.mp3";
import victorySound from "../../assets/victory.mp3";
import useSound from "use-sound";

const GameScreen = () => {
  const [betPrice, setBetPrice] = useState(0);
  const [betType, setBetType] = useState(null);
  const [firstDiceCount, setFirstDiceCount] = useState();
  const [secondDiceCount, setSecondDiceCount] = useState();
  const [selectedBetPriceButton, setSelectedBetPriceButton] = useState();
  const [selectedBetTypeButton, setSelectedBetTypeButton] = useState();
  const { setAlertData, setIsExploding, isExploding } =
    useContext(AppDataContext);
  const { setUserPoints } = useContext(UserContext);
  const [explosionTimerId, setExplosionTimerId] = useState(null);
  const [diceRolledFunction, setDiceRolledFunction] = useState(() => () => {});
  const [diceRollSound] = useSound(rollSound);
  const [victory] = useSound(victorySound);

  useEffect(() => {
    return () => {
      if (explosionTimerId) {
        clearTimeout(explosionTimerId);
      }
    };
  }, []);

  async function handlePLayBet() {
    if (!betType) {
      setAlertData({
        show: true,
        message: "Select Bet type",
        severity: "error",
      });
      return;
    } else if (!betPrice) {
      setAlertData({
        show: true,
        message: "Select Bet price",
        severity: "error",
      });
      return;
    }
    const resp = await playBet(betType, betPrice);

    if (resp && resp.status !== "error") {
      setFirstDiceCount(resp.data.result[0]);
      setSecondDiceCount(resp.data.result[1]);
      setUserPoints(resp.data.newPoints || 0);
      diceRollSound();
      if (resp.data.userWon) {
        setDiceRolledFunction(() => () => {
          setIsExploding(true);
          const timerId = setTimeout(() => {
            setIsExploding(false);
            setExplosionTimerId(null);
          }, 5000);
          setExplosionTimerId(timerId);
          setAlertData({
            show: true,
            message: "You won the bet!!",
            severity: "success",
          });
          victory();
        });
      } else {
        setDiceRolledFunction(() => () => {
          setAlertData({
            show: true,
            message: "You Lost the bet!!",
            severity: "error",
          });
        });
      }
    } else {
      setAlertData({
        show: true,
        message: "You Lost the bet!!",
        severity: "error",
      });
      setBetType(null);
      setSelectedBetPriceButton();
      setSelectedBetTypeButton();
      return;
    }
    setBetPrice(0);
    setBetType(null);
    setSelectedBetPriceButton();
    setSelectedBetTypeButton();
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="1.5rem"
      minHeight="95vh"
      p="2rem"
    >
      {isExploding && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          confettiSource={{ x: 0, y: window.innerHeight, w: 10, h: 10 }}
          initialVelocityX={20}
          initialVelocityY={20}
        />
      )}

      <Header />

      <SelectBet
        setBetPrice={setBetPrice}
        setBetType={setBetType}
        selectedBetPriceButton={selectedBetPriceButton}
        setSelectedBetPriceButton={setSelectedBetPriceButton}
        selectedBetTypeButton={selectedBetTypeButton}
        setSelectedBetTypeButton={setSelectedBetTypeButton}
      />
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Dice
          firstDiceCount={firstDiceCount}
          secondDiceCount={secondDiceCount}
          rollDone={diceRolledFunction}
        />
      </Box>
      <Button
        variant="contained"
        color="success"
        onClick={handlePLayBet}
        sx={{ p: "1rem" }}
      >
        <Typography variant="h5">Play Bet</Typography>
      </Button>
    </Box>
  );
};

export default GameScreen;
