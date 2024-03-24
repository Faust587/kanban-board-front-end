import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEditDashboardModalValidationSchema } from "../CreateEditDashboardModal.validation.ts";
import { getDefaultValues } from "../helpers";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../../../../shared/hooks";

import { CreateDashboardData } from "../../../../../../../types/request";
import { CreateEditDashboardModalForm } from "../CreateEditDashboardModal.form.tsx";
import { CreateEditModalType } from "../../../hooks/useModals.ts";
import {
  CreateDashboard,
  UpdateDashboard,
} from "../../../../../../../store/dashboardSlice/thunks.ts";

export type FormData = {
  name: string;
  description?: string;
};

export const useModalForm = ({
  onClose,
  ...props
}: CreateEditDashboardModalForm) => {
  /**
   * Hooks
   */
  const methods = useForm<FormData>({
    resolver: yupResolver(CreateEditDashboardModalValidationSchema),
    defaultValues: getDefaultValues(props),
  });

  const dispatch = useAppDispatch();

  /**
   * Handlers
   */
  const handleOnSubmit = useCallback(() => {
    methods.handleSubmit((params) => {
      if (props.type === CreateEditModalType.CREATE) {
        const data: CreateDashboardData = {
          name: params.name,
        };
        dispatch(CreateDashboard(data));
      } else if (props.type === CreateEditModalType.EDIT) {
        if (!props.data) throw new Error("dashboard data is undefined");

        dispatch(UpdateDashboard({ id: props.data.id, data: params }));
      }
    })();
    onClose();
  }, [methods, onClose, props.type, props.data, dispatch]);

  /**
   * Result
   */
  return {
    methods,

    handleOnSubmit,
  };
};
