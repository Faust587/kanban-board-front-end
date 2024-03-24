import { TaskEntity } from "./TaskEntity.ts";

export type ColumnEntity = {
  id: string;
  dashboard: string;
  name: string;
  index: number;
  tasks: TaskEntity[];
};
