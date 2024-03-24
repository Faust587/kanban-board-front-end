import {
  ChangeOrderTask,
  CreateTask,
  UpdateTask,
} from "../types/request/task.ts";
import { axiosApiInstance } from "./axios.ts";
import { TaskEntity } from "../types/entities";

export type ChangeOrderResType = {
  updatedTask: TaskEntity;
  affectedTask: TaskEntity;
};

export const TaskApi = {
  create: async (data: CreateTask) => {
    return axiosApiInstance.post<TaskEntity>("/task", data);
  },
  update: async (id: string, data: UpdateTask) => {
    return axiosApiInstance.put<TaskEntity>(`/task/${id}`, data);
  },
  changeOrder: async (id: string, data: ChangeOrderTask) => {
    return axiosApiInstance.put<ChangeOrderResType>(
      `task/change-order/${id}`,
      data,
    );
  },
  changeColumn: async (id: string, columnId: string) => {
    return axiosApiInstance.put<TaskEntity>(`task/change-column/${id}`, {
      columnId,
    });
  },
  delete: async (id: string) => {
    return axiosApiInstance.delete<TaskEntity>(`/task/${id}`);
  },
};
