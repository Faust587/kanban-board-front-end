import { useAppDispatch, useAppSelector } from "../hooks";
import { Alert } from "../components/Alert/Alert.tsx";
import { clearErrors } from "../../store/dashboardSlice";

export const ErrorProvider = () => {
  const dashboardErrors = useAppSelector((state) => state.dashboard.error);
  const dispatch = useAppDispatch();

  const handleCloseAlert = () => {
    dispatch(clearErrors());
  };

  return (
    <Alert
      open={!!dashboardErrors}
      title="Error"
      content={dashboardErrors}
      onClose={handleCloseAlert}
    />
  );
};
