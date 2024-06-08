import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import clickSound from "../../assets/buttonClick.mp3";
import useSound from "use-sound";

const SelectBet = ({
  setBetPrice,
  setBetType,
  selectedBetPriceButton,
  setSelectedBetPriceButton,
  selectedBetTypeButton,
  setSelectedBetTypeButton,
}) => {
  const [clickSoundEffect] = useSound(clickSound);
  const handleBetTypeChange = (type) => {
    clickSoundEffect();
    setBetType(type);
    setSelectedBetTypeButton(type);
  };

  const handleBetPriceChange = (price) => {
    clickSoundEffect();
    setBetPrice(price);
    setSelectedBetPriceButton(price);
  };

  const betConfig = {
    betType: [
      { id: "BELOW_7", text: "7down" },
      { id: "EQUAL_7", text: "7" },
      { id: "ABOVE_7", text: "7up" },
    ],
    betPrice: ["100", "200", "500"],
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      rowGap="2rem"
    >
      <Box display="flex" alignItems="center" columnGap="1rem">
        <Typography variant="h4">Select bet Type:</Typography>

        {betConfig.betType.map((item) => (
          <Button
            startIcon={<AttachMoneyIcon fontSize="large" />}
            key={item.id}
            onClick={() => handleBetTypeChange(item.id)}
            variant={
              selectedBetTypeButton === item.id ? "contained" : "outlined"
            }
            color="secondary"
            sx={{
              border: "4px",
              borderColor: "secondary.main",
              borderStyle: "solid",
            }}
          >
            <Typography variant="h5">{item.text}</Typography>
          </Button>
        ))}
      </Box>
      <Box display="flex" columnGap="1rem" alignItems="center">
        <Typography variant="h4">Select bet Price:</Typography>
        {betConfig.betPrice.map((item) => (
          <Button
            startIcon={<AttachMoneyIcon fontSize="large" />}
            key={item}
            onClick={() => handleBetPriceChange(item)}
            variant={selectedBetPriceButton === item ? "contained" : "outlined"}
            color="secondary"
            sx={{
              border: "4px",
              borderColor: "secondary.main",
              borderStyle: "solid",
            }}
          >
            <Typography variant="h5">{item}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SelectBet;
