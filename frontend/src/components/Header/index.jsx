import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { AppDataContext } from "../../utils/AppDataContext";
import CountUp from "react-countup";

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
      pb="1rem"
      boxShadow="1"
    >
      <Box>
        <Typography variant="h5">
          Hi {localStorage.getItem("userName")}
        </Typography>
      </Box>
      <Box display="flex" columnGap="2rem" alignItems="center">
        <Box>
          {`points `}
          <CountUp end={userPoints} duration={1} />
        </Box>
        <Button onClick={handleLogout} variant="contained" color="warning">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
