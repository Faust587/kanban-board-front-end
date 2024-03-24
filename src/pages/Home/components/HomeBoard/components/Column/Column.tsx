import { ColumnEntity } from "../../../../../../types/entities";
import { FC } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskCard } from "../TaskCard";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { HOME_BOARD_CUSTOM_EVENTS } from "../../HomeBoard.constants";
import { CreateEditModalType, ModalTypes } from "../../hooks/useModals";
import { colors } from "../../../../../../styles/colors";

type ColumnProps = {
  data: ColumnEntity;
};

export const Column: FC<ColumnProps> = ({ data }) => {
  /**
   * Hooks
   */
  const { setNodeRef } = useDroppable({
    id: data.id,
    data: { type: ModalTypes.DASHBOARD, value: data },
  });

  /**
   * Values
   */
  const sortedItems = [...data.tasks].sort((a, b) => a.index - b.index);

  /**
   * Handlers
   */
  const handleOpenCreateTaskForm = () => {
    const event = new CustomEvent(HOME_BOARD_CUSTOM_EVENTS.OPEN_TASK_MODAL, {
      detail: {
        type: CreateEditModalType.CREATE,
        columnId: data.id,
        dashboardId: data.dashboard,
      },
    });
    window.dispatchEvent(event);
  };

  /**
   * Render
   */
  return (
    <Box ref={setNodeRef} bgcolor={colors.lightGray} p={2} borderRadius={2.5}>
      <Box display="flex" justifyContent="space-between">
        <Typography>{data.name}</Typography>

        <Chip color="primary" variant="outlined" label={data.tasks.length} />
      </Box>

      <SortableContext
        items={sortedItems.map(({ id }) => id)}
        strategy={rectSortingStrategy}
      >
        {sortedItems.map((task) => (
          <TaskCard key={task.id} data={task} />
        ))}
      </SortableContext>

      <Box pt={4}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={handleOpenCreateTaskForm}
          startIcon={<AddIcon />}
        >
          Create Task
        </Button>
      </Box>
    </Box>
  );
};
