import { axiosApiInstance } from "./axios.ts";
import { DashboardEntity } from "../types/entities";
import { CreateDashboardData } from "../types/request/index.ts";
import { UpdateDashboardData } from "../types/request/dashboard.ts";

export const DashboardApi = {
  getById: async (id: string) => {
    return axiosApiInstance.get<DashboardEntity>(`/dashboard/${id}`);
  },

  create: async (data: CreateDashboardData) => {
    return axiosApiInstance.post<DashboardEntity>("/dashboard", data);
  },

  update: async (id: string, data: UpdateDashboardData) => {
    return axiosApiInstance.put<DashboardEntity>(`/dashboard/${id}`, data);
  },
};
