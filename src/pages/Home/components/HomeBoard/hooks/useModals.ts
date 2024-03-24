import { useCallback, useEffect, useState } from "react";
import { HOME_BOARD_CUSTOM_EVENTS } from "../HomeBoard.constants";
import { DashboardEntity, TaskEntity } from "../../../../../types/entities";

export enum ModalTypes {
  TASK = "task",
  DASHBOARD = "dashboard",
}

export enum CreateEditModalType {
  CREATE = "create",
  EDIT = "edit",
}

export type TaskColumnDataType = {
  type: CreateEditModalType;
  columnId?: string;
  dashboardId?: string;
  taskData?: TaskEntity;
};

export type DashboardDataType = {
  type: CreateEditModalType;
  data: Omit<DashboardEntity, "columns">;
};

export const useModals = () => {
  /**
   * States
   */
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [taskColumnData, setTaskColumnData] =
    useState<TaskColumnDataType | null>(null);
  const [dashboardModalData, setDashboardModalData] =
    useState<DashboardDataType | null>(null);

  /**
   * Effects
   */
  useEffect(() => {
    const handleOpenTaskModal = (event: CustomEvent<TaskColumnDataType>) => {
      setTaskColumnData(event.detail);
      setModalType(ModalTypes.TASK);
    };

    const handleOpenDashboardModal = (
      event: CustomEvent<DashboardDataType>,
    ) => {
      setDashboardModalData(event.detail);
      setModalType(ModalTypes.DASHBOARD);
    };

    window.addEventListener(
      HOME_BOARD_CUSTOM_EVENTS.OPEN_TASK_MODAL,
      handleOpenTaskModal as EventListener,
    );

    window.addEventListener(
      HOME_BOARD_CUSTOM_EVENTS.OPEN_DASHBOARD_MODAL,
      handleOpenDashboardModal as EventListener,
    );

    return () => {
      window.removeEventListener(
        HOME_BOARD_CUSTOM_EVENTS.OPEN_TASK_MODAL,
        handleOpenTaskModal as EventListener,
      );

      window.removeEventListener(
        HOME_BOARD_CUSTOM_EVENTS.OPEN_DASHBOARD_MODAL,
        handleOpenDashboardModal as EventListener,
      );
    };
  }, []);

  /**
   * Handlers
   */
  const handleCloseModal = useCallback(() => {
    setModalType(null);
  }, []);

  /**
   * Result
   */
  return { modalType, taskColumnData, dashboardModalData, handleCloseModal };
};
