import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE, SLICE_NAME } from "./contants.ts";
import {
  ChangeColumnTaskOrder,
  ChangeTaskColumn,
  CreateColumnTask,
  CreateDashboard,
  DeleteColumnTask,
  GetDashboardById,
  UpdateColumnTask,
  UpdateDashboard,
} from "./thunks";
import {
  ChangeColumnTaskOrderReducer,
  ChangeTaskColumnReducer,
  CreateColumnTaskReducer,
  CreateDashboardReducer,
  DeleteColumnTaskReducer,
  GetDashboardByIdReducer,
  UpdateColumnTaskReducer,
  UpdateDashboardReducer,
} from "./thunkReducers";

export const dashboardSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    clearErrors: (state) => ({ ...state, error: null }),
  },
  extraReducers: (builder) => {
    builder.addCase(GetDashboardById.pending, GetDashboardByIdReducer.pending);
    builder.addCase(
      GetDashboardById.fulfilled,
      GetDashboardByIdReducer.fulfilled,
    );
    builder.addCase(
      GetDashboardById.rejected,
      GetDashboardByIdReducer.rejected,
    );

    builder.addCase(CreateColumnTask.pending, CreateColumnTaskReducer.pending);
    builder.addCase(
      CreateColumnTask.fulfilled,
      CreateColumnTaskReducer.fulfilled,
    );
    builder.addCase(
      CreateColumnTask.rejected,
      CreateColumnTaskReducer.rejected,
    );

    builder.addCase(UpdateColumnTask.pending, UpdateColumnTaskReducer.pending);
    builder.addCase(
      UpdateColumnTask.fulfilled,
      UpdateColumnTaskReducer.fulfilled,
    );
    builder.addCase(
      UpdateColumnTask.rejected,
      UpdateColumnTaskReducer.rejected,
    );

    builder.addCase(DeleteColumnTask.pending, DeleteColumnTaskReducer.pending);
    builder.addCase(
      DeleteColumnTask.fulfilled,
      DeleteColumnTaskReducer.fulfilled,
    );
    builder.addCase(
      DeleteColumnTask.rejected,
      DeleteColumnTaskReducer.rejected,
    );

    builder.addCase(
      ChangeColumnTaskOrder.pending,
      ChangeColumnTaskOrderReducer.pending,
    );
    builder.addCase(
      ChangeColumnTaskOrder.fulfilled,
      ChangeColumnTaskOrderReducer.fulfilled,
    );
    builder.addCase(
      ChangeColumnTaskOrder.rejected,
      ChangeColumnTaskOrderReducer.rejected,
    );

    builder.addCase(ChangeTaskColumn.pending, ChangeTaskColumnReducer.pending);
    builder.addCase(
      ChangeTaskColumn.fulfilled,
      ChangeTaskColumnReducer.fulfilled,
    );
    builder.addCase(
      ChangeTaskColumn.rejected,
      ChangeTaskColumnReducer.rejected,
    );

    builder.addCase(CreateDashboard.pending, CreateDashboardReducer.pending);
    builder.addCase(
      CreateDashboard.fulfilled,
      CreateDashboardReducer.fulfilled,
    );
    builder.addCase(CreateDashboard.rejected, CreateDashboardReducer.rejected);

    builder.addCase(UpdateDashboard.pending, UpdateDashboardReducer.pending);
    builder.addCase(
      UpdateDashboard.fulfilled,
      CreateDashboardReducer.fulfilled,
    );
    builder.addCase(UpdateDashboard.rejected, UpdateDashboardReducer.rejected);
  },
});

export const { clearErrors } = dashboardSlice.actions;

export default dashboardSlice.reducer;
