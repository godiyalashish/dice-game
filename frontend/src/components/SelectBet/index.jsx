import { Box, Button, ButtonGroup, Typography } from "@mui/material";

const SelectBet = ({
  setBetPrice,
  setBetType,
  selectedBetPriceButton,
  setSelectedBetPriceButton,
  selectedBetTypeButton,
  setSelectedBetTypeButton,
}) => {
  const handleBetTypeChange = (type) => {
    setBetType(type);
    setSelectedBetTypeButton(type);
  };

  const handleBetPriceChange = (price) => {
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
        <Typography variant="h5">Select bet Type:</Typography>
        <ButtonGroup>
          {betConfig.betType.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleBetTypeChange(item.id)}
              variant={
                selectedBetTypeButton === item.id ? "contained" : "outlined"
              }
              color="warning"
            >
              {item.text}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box display="flex" columnGap="1rem">
        <Typography variant="h5">Select bet Price:</Typography>
        <ButtonGroup>
          {betConfig.betPrice.map((item) => (
            <Button
              key={item}
              onClick={() => handleBetPriceChange(item)}
              variant={
                selectedBetPriceButton === item ? "contained" : "outlined"
              }
              color="warning"
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default SelectBet;
