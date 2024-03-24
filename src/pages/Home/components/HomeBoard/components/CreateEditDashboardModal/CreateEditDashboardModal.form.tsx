import { DashboardDataType } from "../../hooks/useModals.ts";
import { useModalForm } from "./hooks";
import { FormProvider } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { FormTextField } from "../../../../../../shared/components/FormFields";
import { FC } from "react";

export type CreateEditDashboardModalForm = DashboardDataType & {
  onClose: () => void;
};

export const CreateEditDashboardModalForm: FC<CreateEditDashboardModalForm> = (
  data,
) => {
  const { methods, handleOnSubmit } = useModalForm(data);

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            autoFocus
            required
            fullWidth
            name="name"
            label="Name"
          />
        </Grid>

        <Grid item xs={12}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleOnSubmit}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
