import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AppDataContext } from "../../utils/AppDataContext";

export default function Loader() {
  const { loading } = useContext(AppDataContext);
  return (
    <div>
      <Backdrop sx={{ color: "secondary.main", zIndex: 1301 }} open={loading}>
        <CircularProgress sx={{ color: "primary.main" }} />
      </Backdrop>
    </div>
  );
}
