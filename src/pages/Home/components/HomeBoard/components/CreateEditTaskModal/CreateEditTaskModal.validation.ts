import { object, string } from "yup";

export const CreateEditTaskModalValidationSchema = object().shape({
  name: string().required().min(3, "task name should have at least 3 symbols"),
  description: string().optional(),
});
