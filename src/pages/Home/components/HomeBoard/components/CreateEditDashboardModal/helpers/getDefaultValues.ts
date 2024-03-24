import { FormData } from "../hooks/useModalForm";
import {
  CreateEditModalType,
  DashboardDataType,
} from "../../../hooks/useModals";

export const getDefaultValues = (valuesData: DashboardDataType): FormData => {
  const { type, data } = valuesData;

  if (type === CreateEditModalType.CREATE) {
    return { name: "" };
  }

  return {
    name: data?.name ?? "",
  };
};
