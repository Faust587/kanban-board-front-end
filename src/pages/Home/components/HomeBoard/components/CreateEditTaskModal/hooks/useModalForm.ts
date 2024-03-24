import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEditTaskModalValidationSchema } from "../CreateEditTaskModal.validation.ts";
import { getDefaultValues } from "../helpers/";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../../../../shared/hooks";
import {
  CreateColumnTask,
  UpdateColumnTask,
} from "../../../../../../../store/dashboardSlice/thunks";
import { CreateTask } from "../../../../../../../types/request";
import { CreateEditTaskModalFormProps } from "../CreateEditTaskModal.form";
import { CreateEditModalType } from "../../../hooks/useModals.ts";

export type FormData = {
  name: string;
  description?: string;
};

export const useModalForm = ({
  onClose,
  ...props
}: CreateEditTaskModalFormProps) => {
  /**
   * Hooks
   */
  const methods = useForm<FormData>({
    resolver: yupResolver(CreateEditTaskModalValidationSchema),
    defaultValues: getDefaultValues(props),
  });

  const dispatch = useAppDispatch();

  /**
   * Handlers
   */
  const handleOnSubmit = useCallback(() => {
    methods.handleSubmit((params) => {
      if (props.type === CreateEditModalType.CREATE) {
        if (!props.columnId) throw new Error("column id is undefined");
        const data: CreateTask = {
          columnId: props.columnId,
          name: params.name,
          description: params.description,
        };
        dispatch(CreateColumnTask(data));
      } else if (props.type === CreateEditModalType.EDIT) {
        if (!props.taskData) throw new Error("task data is undefined");

        dispatch(
          UpdateColumnTask({ taskId: props.taskData.id, taskValue: params }),
        );
      }
    })();
    onClose();
  }, [methods, props.type, props.columnId, props.taskData, dispatch, onClose]);

  /**
   * Result
   */
  return {
    methods,

    handleOnSubmit,
  };
};
