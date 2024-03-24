import { useAppSelector } from "../../../../../shared/hooks";
import { LoadingStatusEnum } from "../../../../../constants/loading";

export const useDataLoading = () => {
  /**
   * Values
   */
  const loadingStatus = useAppSelector((state) => state.dashboard.loading);
  const loadingUpdatesStatus = useAppSelector(
    (state) => state.dashboard.loadingUpdates,
  );
  const dashboardData = useAppSelector((state) => state.dashboard.dashboard);

  const isLoading = loadingStatus === LoadingStatusEnum.PENDING;
  const isNotFound = loadingStatus === LoadingStatusEnum.FAILED;
  const isIdle = loadingStatus === LoadingStatusEnum.IDLE;

  const isUpdatesLoading = loadingUpdatesStatus === LoadingStatusEnum.PENDING;

  const isSuccess =
    loadingStatus === LoadingStatusEnum.SUCCESS && dashboardData;

  /**
   * Result
   */
  return {
    isLoading,
    isUpdatesLoading,
    isNotFound,
    isIdle,
    isSuccess,
    dashboardData,
  };
};
