import { Box, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { AppDataContext } from "../../utils/AppDataContext";
import MuiAlert from "@mui/material/Alert";

const SnackBar = () => {
  const { handleCloseAlertBox, alertData } = useContext(AppDataContext);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />;
  });
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={alertData.show}
        autoHideDuration={6000}
        onClose={handleCloseAlertBox}
      >
        <Alert
          onClose={handleCloseAlertBox}
          severity={alertData.severity}
          sx={{ width: "80%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackBar;
