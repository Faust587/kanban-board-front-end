import { Box, Button, TextField } from "@mui/material";
import { FormEvent, memo, useCallback, useState } from "react";
import { useAppDispatch } from "../../../../shared/hooks";
import { GetDashboardById } from "../../../../store/dashboardSlice/thunks.ts";
import { FormStyled } from "./HomeHeader.styled.ts";
import { HOME_BOARD_CUSTOM_EVENTS } from "../HomeBoard/HomeBoard.constants.ts";
import { CreateEditModalType } from "../HomeBoard/hooks/useModals.ts";

const HomeHeaderComponent = () => {
  /**
   * States
   */
  const [boardId, setBoardId] = useState("");

  /**
   * Hooks
   */
  const dispatch = useAppDispatch();

  /**
   * Handlers
   */
  const handleRequestDashboard = useCallback(
    (event: FormEvent<unknown>) => {
      event.preventDefault();
      dispatch(GetDashboardById(boardId));
    },
    [dispatch, boardId],
  );

  const handleOpenCreateDashboardForm = useCallback(() => {
    const event = new CustomEvent(
      HOME_BOARD_CUSTOM_EVENTS.OPEN_DASHBOARD_MODAL,
      {
        detail: {
          type: CreateEditModalType.CREATE,
        },
      },
    );
    window.dispatchEvent(event);
  }, []);

  /**
   * Render
   */
  return (
    <Box pt={2}>
      <FormStyled onSubmit={handleRequestDashboard}>
        <Box
          width={{ lg: "45%", md: "60%", sm: "95%", xs: "95%" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder="Enter a board ID here..."
            fullWidth
            variant="outlined"
            size="small"
          />
          <Box ml={2}>
            <Button variant="outlined" size="small" type="submit">
              Load
            </Button>
          </Box>
          <Box ml={2}>
            <Button
              variant="outlined"
              size="small"
              type="button"
              onClick={handleOpenCreateDashboardForm}
            >
              Create
            </Button>
          </Box>
        </Box>
      </FormStyled>
    </Box>
  );
};

export const HomeHeader = memo(HomeHeaderComponent);
