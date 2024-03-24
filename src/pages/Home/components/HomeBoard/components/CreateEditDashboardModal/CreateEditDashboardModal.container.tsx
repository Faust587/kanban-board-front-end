import { DashboardDataType } from "../../hooks/useModals.ts";
import { FC } from "react";
import { ModalWindow } from "../../../../../../shared/components";
import { CreateEditDashboardModalForm } from "./CreateEditDashboardModal.form.tsx";

type CreateEditDashboardModalContainerProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  data: DashboardDataType | null;
};

export const CreateEditDashboardModalContainer: FC<
  CreateEditDashboardModalContainerProps
> = ({ isOpen, data, title, onClose }) => {
  return (
    <ModalWindow isOpen={isOpen} title={title} onClose={onClose}>
      {data && (
        <>
          <CreateEditDashboardModalForm onClose={onClose} {...data} />
        </>
      )}
    </ModalWindow>
  );
};
