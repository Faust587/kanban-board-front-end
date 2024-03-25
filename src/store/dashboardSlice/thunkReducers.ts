import { LoadingStatusEnum } from "../../constants/loading.ts";
import { InitialStateType } from "./contants.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { DashboardEntity, TaskEntity } from "../../types/entities";
import { ChangeOrderResType } from "../../api/taskApi.ts";
import { sortTaskByOrder } from "../../utils/index.ts";

export const GetDashboardByIdReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loading: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<DashboardEntity>,
  ): InitialStateType => {
    return {
      ...state,
      dashboard: action.payload,
      loading: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loading: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};

export const CreateDashboardReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loading: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<DashboardEntity>,
  ): InitialStateType => {
    return {
      ...state,
      dashboard: action.payload,
      loading: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loading: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};

export const UpdateDashboardReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loading: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<DashboardEntity>,
  ): InitialStateType => {
    return {
      ...state,
      dashboard: action.payload,
      loading: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loading: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};

export const CreateColumnTaskReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loadingUpdates: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<TaskEntity>,
  ): InitialStateType => {
    if (!state.dashboard) return { ...state };

    const updatedColumns = state.dashboard.columns.map((column) => {
      if (column.id !== action.payload.column) return column;

      return {
        ...column,
        tasks: [...column.tasks, action.payload],
      };
    });
    return {
      ...state,
      dashboard: { ...state.dashboard, columns: updatedColumns },
      loadingUpdates: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => {
    return {
      ...state,
      loadingUpdates: LoadingStatusEnum.FAILED,
      error:
        typeof action.payload === "string" ? action.payload : "Unknown error",
    };
  },
};

export const UpdateColumnTaskReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loadingUpdates: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<TaskEntity>,
  ): InitialStateType => {
    if (!state.dashboard) return { ...state };
    const updatedColumns = state.dashboard.columns.map((column) => {
      const filteredTasks = column.tasks.filter(
        ({ id }) => id !== action.payload.id,
      );
      if (action.payload.column === column.id) {
        return {
          ...column,
          tasks: sortTaskByOrder([...filteredTasks, action.payload]),
        };
      }
      return {
        ...column,
        tasks: sortTaskByOrder(filteredTasks),
      };
    });

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        columns: [...updatedColumns],
      },
      loadingUpdates: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loadingUpdates: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};

export const DeleteColumnTaskReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loadingUpdates: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<TaskEntity>,
  ): InitialStateType => {
    if (!state.dashboard) return { ...state };
    const updatedColumns = state.dashboard.columns.map((column) => {
      const filteredTasks = column.tasks.filter(
        ({ id }) => id !== action.payload.id,
      );
      return { ...column, tasks: filteredTasks };
    });

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        columns: [...updatedColumns],
      },
      loadingUpdates: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loadingUpdates: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};

export const ChangeColumnTaskOrderReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loadingUpdates: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<ChangeOrderResType>,
  ): InitialStateType => {
    if (!state.dashboard) return { ...state };
    const { affectedTask, updatedTask } = action.payload;
    const columnsWithoutUpdatedTasks = state.dashboard.columns.map((column) => {
      const columnTasks = column.tasks.filter(
        ({ id }) => id !== affectedTask.id && id !== updatedTask.id,
      );
      return { ...column, tasks: columnTasks };
    });
    const updatedColumns = columnsWithoutUpdatedTasks.map((column) => {
      const tasks = column.tasks;
      if (column.id === updatedTask.column) {
        tasks.push(updatedTask);
      }
      if (column.id === affectedTask.column) {
        tasks.push(affectedTask);
      }

      return { ...column, tasks: sortTaskByOrder(tasks) };
    });

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        columns: [...updatedColumns],
      },
      loadingUpdates: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
    loadingUpdates: LoadingStatusEnum.FAILED,
  }),
};

export const ChangeTaskColumnReducer = {
  pending: (state: InitialStateType): InitialStateType => {
    return { ...state, loadingUpdates: LoadingStatusEnum.PENDING };
  },
  fulfilled: (
    state: InitialStateType,
    action: PayloadAction<TaskEntity>,
  ): InitialStateType => {
    if (!state.dashboard) return { ...state };
    const updatedColumns = state.dashboard.columns.map((column) => {
      const filteredTasks = column.tasks.filter(
        ({ id }) => id !== action.payload.id,
      );
      if (action.payload.column === column.id) {
        return { ...column, tasks: [...filteredTasks, action.payload] };
      }
      return {
        ...column,
        tasks: sortTaskByOrder(filteredTasks),
      };
    });

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        columns: [...updatedColumns],
      },
      loadingUpdates: LoadingStatusEnum.SUCCESS,
    };
  },
  rejected: (
    state: InitialStateType,
    action: PayloadAction<unknown>,
  ): InitialStateType => ({
    ...state,
    loadingUpdates: LoadingStatusEnum.FAILED,
    error:
      typeof action.payload === "string" ? action.payload : "Unknown error",
  }),
};
