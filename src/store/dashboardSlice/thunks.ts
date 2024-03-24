import { createAsyncThunk } from "@reduxjs/toolkit";
import { SLICE_NAME } from "./contants.ts";
import { DashboardApi } from "../../api/dashboardApi.ts";
import axios from "axios";
import { TaskApi } from "../../api/taskApi.ts";
import {
  CreateDashboardData,
  CreateTask,
  UpdateTask,
} from "../../types/request";
import { ChangeOrderTask } from "../../types/request/task.ts";
import { UpdateDashboardData } from "../../types/request/dashboard.ts";

export const GetDashboardById = createAsyncThunk(
  `${SLICE_NAME}/GetDashboardById`,
  async (id: string, thunkAPI) => {
    try {
      const res = await DashboardApi.getById(id);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const CreateDashboard = createAsyncThunk(
  `${SLICE_NAME}/CreateDashboard`,
  async (data: CreateDashboardData, thunkAPI) => {
    try {
      const res = await DashboardApi.create(data);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const UpdateDashboard = createAsyncThunk(
  `${SLICE_NAME}/UpdateDashboard`,
  async ({ id, data }: { id: string; data: UpdateDashboardData }, thunkAPI) => {
    try {
      const res = await DashboardApi.update(id, data);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const CreateColumnTask = createAsyncThunk(
  `${SLICE_NAME}/CreateTask`,
  async (data: CreateTask, thunkAPI) => {
    try {
      const res = await TaskApi.create(data);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export type UpdateColumnTaskProps = { taskId: string; taskValue: UpdateTask };

export const UpdateColumnTask = createAsyncThunk(
  `${SLICE_NAME}/UpdateColumnTask`,
  async (data: UpdateColumnTaskProps, thunkAPI) => {
    try {
      const res = await TaskApi.update(data.taskId, data.taskValue);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const DeleteColumnTask = createAsyncThunk(
  `${SLICE_NAME}/DeleteColumnTask`,
  async (id: string, thunkAPI) => {
    try {
      const res = await TaskApi.delete(id);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const ChangeColumnTaskOrder = createAsyncThunk(
  `${SLICE_NAME}/ChangeColumnTaskOrder`,
  async (data: { id: string; taskData: ChangeOrderTask }, thunkAPI) => {
    const { id, taskData } = data;
    try {
      const res = await TaskApi.changeOrder(id, taskData);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

export const ChangeTaskColumn = createAsyncThunk(
  `${SLICE_NAME}/ChangeTaskColumn`,
  async (data: { id: string; columnId: string }, thunkAPI) => {
    const { id, columnId } = data;
    try {
      const res = await TaskApi.changeColumn(id, columnId);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);
