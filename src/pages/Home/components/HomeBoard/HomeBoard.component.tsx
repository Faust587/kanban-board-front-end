import { DashboardEntity, TaskEntity } from "../../../../types/entities";
import { FC, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Column, TaskCard } from "./components";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  ChangeColumnTaskOrder,
  ChangeTaskColumn,
} from "../../../../store/dashboardSlice/thunks.ts";
import { useAppDispatch } from "../../../../shared/hooks";
import { ModalTypes } from "./hooks/useModals.ts";
import { ChangeOrderTask } from "../../../../types/request/task.ts";

type HomeBoardComponentProps = {
  dashboard: DashboardEntity;
};

export const HomeBoardComponent: FC<HomeBoardComponentProps> = ({
  dashboard,
}) => {
  const [draggedTask, setDraggedTask] = useState<TaskEntity>();

  /**
   * Hooks
   */
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  /**
   * Values
   */
  const columnWidth = 12 / dashboard.columns.length;

  const sortedColumns = [...dashboard.columns].sort(
    (a, b) => a.index - b.index,
  );

  /**
   * Handlers
   */
  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === ModalTypes.TASK) {
      setDraggedTask(event.active.data.current?.value);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const isDroppedOnTask = over?.data.current?.type === ModalTypes.TASK;

    if (!over?.data.current || !active?.data.current) return;

    if (over.data.current.value.id === active.data.current.value.id) return;

    if (isDroppedOnTask) {
      const taskData: ChangeOrderTask = {
        columnId: over.data.current.value.column + "",
        index: +over.data.current.value.index,
      };

      dispatch(
        ChangeColumnTaskOrder({
          id: active.data.current.value.id + "",
          taskData,
        }),
      );
      return;
    }

    if (!isDroppedOnTask) {
      const data = {
        id: active.data.current?.value.id,
        columnId: over?.data.current?.value.id,
      };
      dispatch(ChangeTaskColumn(data));
      return;
    }
  };

  /**
   * Render
   */
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box pt={2}>
        <SortableContext
          items={sortedColumns.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          <Grid container spacing={2}>
            {sortedColumns.map((column) => (
              <Grid key={column.id} item xs={columnWidth}>
                <Column data={column} />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </Box>

      {createPortal(
        <DragOverlay>
          {draggedTask ? <TaskCard data={draggedTask} /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
