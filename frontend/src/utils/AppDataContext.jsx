import { createContext, useState } from "react";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [loading, setShowLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    severity: " ",
  });
  const [isExploding, setIsExploding] = useState(false);

  const handleOpenAlertBox = () => {
    setAlertData((prevData) => ({
      ...prevData,
      show: true,
    }));
  };

  const handleCloseAlertBox = () => {
    setAlertData({
      show: false,
      message: "",
      severity: "",
    });
  };

  return (
    <AppDataContext.Provider
      value={{
        loading,
        setShowLoading,
        alertData,
        setAlertData,
        handleCloseAlertBox,
        handleOpenAlertBox,
        isExploding,
        setIsExploding,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
