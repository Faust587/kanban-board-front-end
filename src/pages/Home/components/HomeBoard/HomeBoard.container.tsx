import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useDataLoading, useDeleteTaskDialog, useModals } from "./hooks";
import { Render } from "../../../../shared/components";
import { LoadingStatusContainerStyled } from "./HomeBoard.styled.ts";
import { HomeBoardComponent } from "./HomeBoard.component.tsx";
import { CreateEditTaskModal } from "./components";
import { CreateEditModalType, ModalTypes } from "./hooks/useModals.ts";
import { CreateEditDashboardModal } from "./components/CreateEditDashboardModal";

export const HomeBoardContainer = () => {
  /**
   * Hooks
   */
  const {
    isLoading,
    isUpdatesLoading,
    isIdle,
    isNotFound,
    isSuccess,
    dashboardData,
  } = useDataLoading();

  const { modalType, taskColumnData, dashboardModalData, handleCloseModal } =
    useModals();
  const {
    isDeleteTaskDialogOpen,
    handleSubmitDeleteTaskDialog,
    handleCloseDeleteTaskDialog,
  } = useDeleteTaskDialog();

  /**
   * Render
   */
  return (
    <Box flex={1}>
      <Render if={isLoading}>
        <LoadingStatusContainerStyled>
          <CircularProgress />
        </LoadingStatusContainerStyled>
      </Render>

      <Render if={isUpdatesLoading}>
        <Box pt={2}>
          <LinearProgress />
        </Box>
      </Render>

      <Render if={isIdle}>
        <LoadingStatusContainerStyled>
          <Typography variant="h5">Welcome</Typography>
        </LoadingStatusContainerStyled>
      </Render>

      <Render if={isNotFound}>
        <LoadingStatusContainerStyled>
          <Typography variant="h5">Not Found</Typography>
        </LoadingStatusContainerStyled>
      </Render>

      <Render if={!!isSuccess}>
        {dashboardData ? (
          <Box pt={2}>
            <Box display="flex">
              <Chip
                data-testid="dashboard-name-chip"
                color="primary"
                label={`Dashboard: ${dashboardData.name}`}
              />
              <Box pl={1}>
                <Chip
                  data-testid="dashboard-id-chip"
                  label={`ID: ${dashboardData.id}`}
                />
              </Box>
            </Box>
            <HomeBoardComponent dashboard={dashboardData} />
          </Box>
        ) : (
          <LoadingStatusContainerStyled>
            <Typography variant="h5">No Data</Typography>
          </LoadingStatusContainerStyled>
        )}
      </Render>

      <CreateEditTaskModal
        title={
          taskColumnData?.type === CreateEditModalType.CREATE
            ? "Create New Task"
            : "Edit Task"
        }
        onClose={handleCloseModal}
        isOpen={modalType === ModalTypes.TASK}
        data={taskColumnData}
      />

      <CreateEditDashboardModal
        title={
          dashboardModalData?.type === CreateEditModalType.CREATE
            ? "Create New Dashboard"
            : "Edit Dashboard"
        }
        onClose={handleCloseModal}
        isOpen={modalType === ModalTypes.DASHBOARD}
        data={dashboardModalData}
      />

      <Dialog
        open={isDeleteTaskDialogOpen}
        onClose={handleCloseDeleteTaskDialog}
        aria-labelledby="close-delete-task-dialog-title"
      >
        <DialogTitle id="close-delete-task-dialog-title">
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteTaskDialog}>Cancel</Button>
          <Button
            color="error"
            onClick={handleSubmitDeleteTaskDialog}
            autoFocus
          >
            Yes, delete task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
