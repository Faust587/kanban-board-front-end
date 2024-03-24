import { ColumnEntity } from "./ColumnEntity.ts";

export type DashboardEntity = {
  id: string;
  name: string;
  columns: ColumnEntity[];
};
