import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { AppDataContext } from "../../utils/AppDataContext";
import CountUp from "react-countup";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Header = () => {
  const { userPoints, setIsAuthenticated } = useContext(UserContext);
  const { setAlertData } = useContext(AppDataContext);
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAlertData({
      message: "Logged out successfully",
      severity: "success",
      show: true,
    });
  };
  return (
    <Box
      w="100vw"
      display="flex"
      justifyContent="space-between"
      mb="1rem"
      borderBottom={1}
      borderColor="grey"
      p="1rem"
      boxShadow="1"
      bgcolor="rgba(0, 0, 0, 0.5)"
      alignItems={"center"}
    >
      <Box>
        <Typography variant="h5" color="secondary.main">
          Hi {localStorage.getItem("userName")}
        </Typography>
      </Box>
      <Box display="flex" columnGap="2rem" alignItems="center">
        <Box display="flex" alignItems="center">
          <AttachMoneyIcon color="secondary" fontSize="large" />
          <Typography color="secondary.main" variant="h4">
            <CountUp end={userPoints} duration={1} />
          </Typography>
        </Box>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="warning"
          sx={{
            border: "4px",
            borderColor: "secondary.main",
            borderStyle: "solid",
          }}
        >
          <Typography>Logout</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
