import { TaskEntity } from "../../../../../../types/entities";
import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardContainerStyled } from "./TaskCard.styled.ts";
import { HOME_BOARD_CUSTOM_EVENTS } from "../../HomeBoard.constants.ts";
import { CreateEditModalType, ModalTypes } from "../../hooks/useModals.ts";
import { colors } from "../../../../../../styles/colors.ts";
type TaskCardProps = {
  data: TaskEntity;
};

export const TaskCard: FC<TaskCardProps> = ({ data }) => {
  /**
   * Hooks
   */
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: data.id,
    data: { type: ModalTypes.TASK, value: data },
  });

  /**
   * Values
   */
  const dndStyle = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  /**
   * Handlers
   */
  const handleOpenEditTaskForm = () => {
    const event = new CustomEvent(HOME_BOARD_CUSTOM_EVENTS.OPEN_TASK_MODAL, {
      detail: {
        type: CreateEditModalType.EDIT,
        taskData: data,
      },
    });
    window.dispatchEvent(event);
  };

  const handleOpenDeleteTaskDialog = () => {
    const event = new CustomEvent(
      HOME_BOARD_CUSTOM_EVENTS.OPEN_DELETE_TASK_DIALOG,
      {
        detail: data.id,
      },
    );
    window.dispatchEvent(event);
  };

  /**
   * Render
   */
  return (
    <CardContainerStyled
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dndStyle}
      bgcolor={isDragging ? colors.gray : colors.white}
      p={2}
      mt={2}
    >
      <Typography>{data.name}</Typography>

      <Typography color={colors.textSecondary}>{data.description}</Typography>

      <Box display="flex" justifyContent="end" mt={2}>
        <IconButton onClick={handleOpenEditTaskForm}>
          <EditNoteIcon />
        </IconButton>

        <IconButton onClick={handleOpenDeleteTaskDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </CardContainerStyled>
  );
};
