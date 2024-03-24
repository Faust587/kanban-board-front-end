import { useEffect, useState } from "react";
import { HOME_BOARD_CUSTOM_EVENTS } from "../HomeBoard.constants.ts";
import { useAppDispatch } from "../../../../../shared/hooks";
import { DeleteColumnTask } from "../../../../../store/dashboardSlice/thunks.ts";

export const useDeleteTaskDialog = () => {
  /**
   * Hooks
   */
  const dispatch = useAppDispatch();

  /**
   * States
   */
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  /**
   * Handlers
   */
  const handleCloseDeleteTaskDialog = () => {
    setIsDeleteTaskDialogOpen(false);
  };

  const handleSubmitDeleteTaskDialog = () => {
    handleCloseDeleteTaskDialog();
    if (!taskId) throw new Error("task id is undefined");
    dispatch(DeleteColumnTask(taskId));
  };

  /**
   * Effects
   */
  useEffect(() => {
    const handleOpenDeleteTaskDialog = (event: CustomEvent<string>) => {
      setTaskId(event.detail);
      setIsDeleteTaskDialogOpen(true);
    };

    window.addEventListener(
      HOME_BOARD_CUSTOM_EVENTS.OPEN_DELETE_TASK_DIALOG,
      handleOpenDeleteTaskDialog as EventListener,
    );

    return () => {
      window.removeEventListener(
        HOME_BOARD_CUSTOM_EVENTS.OPEN_DELETE_TASK_DIALOG,
        handleOpenDeleteTaskDialog as EventListener,
      );
    };
  }, []);

  /**
   * Result
   */
  return {
    isDeleteTaskDialogOpen,

    handleSubmitDeleteTaskDialog,
    handleCloseDeleteTaskDialog,
  };
};
