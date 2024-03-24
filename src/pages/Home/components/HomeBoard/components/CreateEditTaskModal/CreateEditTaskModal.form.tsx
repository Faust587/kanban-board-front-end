import { Box, Button, Grid } from "@mui/material";
import { FormTextField } from "../../../../../../shared/components/FormFields";
import { useModalForm } from "./hooks/index.ts";
import { FormProvider } from "react-hook-form";
import { FC } from "react";
import { TaskColumnDataType } from "../../hooks/useModals.ts";

export type CreateEditTaskModalFormProps = TaskColumnDataType & {
  onClose: () => void;
};

export const CreateEditTaskModalForm: FC<CreateEditTaskModalFormProps> = (
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
          <FormTextField
            minRows={4}
            multiline
            fullWidth
            name="description"
            label="Description"
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
