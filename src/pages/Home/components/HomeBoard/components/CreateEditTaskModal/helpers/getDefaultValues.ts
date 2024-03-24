import { FormData } from "../hooks/useModalForm.ts";
import {
  CreateEditModalType,
  TaskColumnDataType,
} from "../../../hooks/useModals.ts";

export const getDefaultValues = (valuesData: TaskColumnDataType): FormData => {
  const { type, taskData } = valuesData;

  if (type === CreateEditModalType.CREATE) {
    return { name: "", description: "" };
  }

  return {
    name: taskData?.name ?? "",
    description: taskData?.description ?? "",
  };
};
