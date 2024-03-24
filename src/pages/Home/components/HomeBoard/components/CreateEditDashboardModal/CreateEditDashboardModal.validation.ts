import { object, string } from "yup";

export const CreateEditDashboardModalValidationSchema = object().shape({
  name: string()
    .required()
    .min(3, "Dashboard name should have at least 3 symbols"),
});
