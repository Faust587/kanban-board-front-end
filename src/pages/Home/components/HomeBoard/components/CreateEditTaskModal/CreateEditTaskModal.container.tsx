import { FC } from "react";
import { TaskColumnDataType } from "../../hooks/useModals.ts";
import { CreateEditTaskModalForm } from "./CreateEditTaskModal.form.tsx";
import { ModalWindow } from "../../../../../../shared/components";

export type CreateEditTaskModalContainerProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  data: TaskColumnDataType | null;
};

export const CreateEditTaskModalContainer: FC<
  CreateEditTaskModalContainerProps
> = ({ isOpen, data, title, onClose }) => {
  return (
    <ModalWindow isOpen={isOpen} title={title} onClose={onClose}>
      <>{data && <CreateEditTaskModalForm onClose={onClose} {...data} />}</>
    </ModalWindow>
  );
};
