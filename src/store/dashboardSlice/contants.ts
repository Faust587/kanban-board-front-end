import { LoadingStatusEnum } from "../../constants/loading.ts";
import { DashboardEntity } from "../../types/entities";

export type InitialStateType = {
  loading: LoadingStatusEnum;
  loadingUpdates: LoadingStatusEnum;
  dashboard: DashboardEntity | null;
  error: string | null;
};

export const SLICE_NAME = "dashboard";

export const INITIAL_STATE: InitialStateType = {
  loading: LoadingStatusEnum.IDLE,
  loadingUpdates: LoadingStatusEnum.IDLE,
  dashboard: null,
  error: null,
};
